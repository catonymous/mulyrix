import express  from 'express';
import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';
import adaptors from '../lyrics/adaptors';
import url from 'url';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import iconv from 'iconv-lite';

function decode(res, buffer) {
  const contentType = res.get('content-type');
  if(contentType) {
    const match = /\Wcharset=(.+)$/i.exec(contentType);
    if(match) {
      return iconv.decode(buffer, match[1]);
    }
  }
  return buffer.toString();
}

const router = express.Router();

router.all('/:url', (req, res) => {
  const parsedUrl = url.parse(req.params.url);
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
  const adaptor = adaptors[baseUrl];
  if(!adaptor) {
    return res.status(404).end('Not found');
  }
  const replacer = adaptor.routes && adaptor.routes[parsedUrl.pathname] || adaptor.index;
  request({ method: req.method, uri: req.params.url, body: querystring.stringify(req.body), encoding: null}, (err, remoteRes, buffer) => {
    if (err) {
      return res.send(err);
    }
    res.set(remoteRes.headers);
    // HPE_UNEXPECTED_CONTENT_LENGTH work-around
    if (res.get('transfer-encoding') === 'chunked') {
      res.removeHeader('transfer-encoding');
    }
    // 502 Bad Gateway: upstream sent too big header while reading response header from upstream
    res.removeHeader('content-security-policy');
    // res.removeHeader('x-frame-options');
    let body = decode(res, buffer);
    if(!replacer) {
      return res.send(body);
    }
    replacer.plain && replacer.plain.forEach(r => body = body.replace(r.regex, r.replace));
    if(replacer.html) {
      const $ = cheerio.load(body);
      replacer.html.remove && $(replacer.html.remove).remove();
      replacer.html.attr && replacer.html.attr.forEach(r => $(r.selector).each((i, e) => {
        const a = $(e);
        a.attr(r.attr, r.replace(a.attr(r.attr)));
      }));
      replacer.html.css && replacer.html.css.forEach(r =>  $(r.selector).css(r.prop, r.val));
      body = $.html();
    }
    return res.send(body);
  }); // request
});

export const middleware = bodyParser.urlencoded({ extended: true });
export default router;
