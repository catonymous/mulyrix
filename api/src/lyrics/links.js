import request from 'request';
import cheerio from 'cheerio';

export default (url, selector, found) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      const $ = cheerio.load(body);
      console.log(`PARSE: ${url} => ${selector}`);
      Promise.all($(selector).map((i, e) => {
        const a = $(e);

        return found(a.text(), a.attr('href'));
      }).toArray()).then(resolve).catch(reject); // all
    }); // request
  }); // promise
};
