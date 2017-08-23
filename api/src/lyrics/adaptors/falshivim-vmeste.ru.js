import proxyUrl from '../../proxy-url';
import { padStyleLinks, padAttrLinks, proxyScript } from './common'

const url = 'http://www.falshivim-vmeste.ru';
const jsRoute = '/js/fv-aat.js';

export default {
  [url]: {
  	links: {
  	  baseUrl: url,
      section: artist => '/all.html',
  	  artist: 'a[href^="/authors/"]',
      song: 'a[href^="/songs/"]',
      songUrl: songRef => songRef
  	},
  	index: {
  	  plain: padStyleLinks(url),
  	  html: {
        remove: '#alogo,noindex,#guitarist,#maintable>colgroup>col:nth-child(1),#maintable>colgroup>col:nth-child(3),#maintable>tbody>tr>td:nth-child(1),#maintable>tbody>tr>td:nth-child(3),#table2>tbody>tr:nth-child(1)',
      	attr: [...padAttrLinks(url), proxyScript(jsRoute)],
        css: [{
          selector: '#table2',
          prop: 'margin-top',
          val: '-150px'
        }]
  	  }
    },
    routes: {
      [jsRoute]: {
        plain: [{
          regex: /^/,
          replace: `${proxyUrl};`
        }, {
          regex: /"\/chords\/html\/"\+s\+".html"/g,
          replace: `proxyUrl("${url}/chords/html/"+s+".html")`
        }, {
          regex: /\/chords\/gif\//g,
          replace: `${url}/chords/gif/`
        }]
      }
    }
  }
};
