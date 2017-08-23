import fs from 'fs';
import path from 'path';

export default function walk(dir, found) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) {
        return reject(err);
      }
      Promise.all(list.map(file => path.resolve(dir, file)).map(file => {
        return new Promise((resolveFile, rejectFile) => {
          fs.stat(file, (errFile, stat) => {
            if (errFile) {
              console.log(`WARN: ${file}: ${errFile}`);
              return resolveFile(); // just skip
            }
            let p;

            if (stat && stat.isDirectory()) {
              p = walk(file, found);
            } else {
              p = found(file);
            }
            p.then(resolveFile).catch(rejectFile);
          }); // stat
        }); // file promise
      })).then(resolve); // all
    }); // readdir
  }); // promise
}
