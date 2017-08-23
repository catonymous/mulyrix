import proxyUrl from '../../proxy-url';
import { padStyleLinks, padAttrLinks } from './common'

const url = 'http://www.amalgama-lab.com';

export default {
  [url]: {
  	links: {
  	  baseUrl: url,
      section: artist => `/songs/${artist.charAt(0).toLowerCase()}/`,
  	  artist: '.texts a',
      song: '#songs_nav>ul>ul>li>a',
      songUrl: (songRef, artistRef) => `${artistRef}${songRef}` 
  	},
  	index: {
      plain: padStyleLinks(url),
  	  html: {
        remove: '.noprint',
        attr: [{
          selector: 'a[href^="/author"]',
          attr: 'target',
          replace: () => '_blank'
        }, ...padAttrLinks(url)],
  	  }
    }
  }
};
