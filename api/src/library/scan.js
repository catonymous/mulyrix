import walk from './file-walker';
import wrap from './lazy-object';
import fs from 'fs';
import path from 'path';
import mm from 'musicmetadata';
import EventEmitter from 'events';

class MediaLibrary extends EventEmitter {
  constructor(dir, url) {
    super();
    this.dir = dir;
    this.url = url;
    this.library = {};
    this.promise = new Promise((resolve, reject) => {
      console.log(`INFO: Scanning directory ${dir}...`);
      walk(dir, file => {
        return this.processFile(file);
      }).then(() => {
        resolve(this.library);
      }).catch(e => {
        reject(e);
      }); // walk
    });
  }

  processFile(file) {
    return new Promise(resolve => {
      const stream = fs.createReadStream(file);

      mm(stream, (err, metadata) => {
        stream.close();
        if (err) {
          console.log(`WARN: ${file}: ${err}`);
        } else {
          const trackPath = `${this.url}/${path.relative(this.dir, file).split(path.sep).map(c => encodeURIComponent(c)).join('/')}`;

          metadata.artist.forEach(artist => {
            wrap(this.library).set(artist).set(metadata.year).set(metadata.album)
              .set(metadata.disk.no).set(metadata.track.no).set(metadata.title, trackPath);
            const track = {artist, title: metadata.title, path: trackPath};
            console.log(track);
            this.emit('add', this.library, track);
          }); // forEach
        }
        resolve();
      }); // mm
    }); // promise
  }
}

export default (dir, url) => {
  const emitter = new MediaLibrary(dir, url);
  return Object.assign(emitter.promise, {
    add(callback) {
      emitter.on('add', callback);
      return this;
    }
  }); // assign
};
