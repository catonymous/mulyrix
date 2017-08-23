import links from './links';
import adaptors from './adaptors';
import proxyUrl from '../proxy-url';

function makePlain(array) {
  return [].concat(...array);
}

function skipError(error) {
  console.error(error);
  return null;
}

export default (artist, title) => {
  const searchTitle = title.replace(/\s*\(.+\)$/, ''); // remove version info

  return Promise.all(Object.keys(adaptors).map(url => {
  	const linksConfig = adaptors[url].links;
    const section = linksConfig.section(artist);
    const favicon = `${url}/favicon.ico`;

  	return links(`${linksConfig.baseUrl}${section}`, `${linksConfig.artist}:contains("${artist}")`, (artist, artistRef) => {
      const artistUrl = `${linksConfig.baseUrl}${artistRef}`;
  	  return links(artistUrl, `${linksConfig.song}:contains("${searchTitle}")`, (title, songRef) => {
        const songUrl = `${linksConfig.baseUrl}${linksConfig.songUrl(songRef, artistRef)}`;
        console.log(`FOUND: ${artist} - ${title} => ${songUrl}`);
  	    return {[`${songUrl}`]: { artist, title, favicon, proxy: proxyUrl(songUrl) }};
  	  }).catch(skipError); // grab songs
    }).catch(skipError); // grab artists
  })).then(makePlain).then(makePlain).then(lyrics => Object.assign({}, ...lyrics));
};
