export default function wrap(obj) {
  return {
    set(prop, val = {}) {
      if (!(prop in obj) || obj[prop] === null) {
        obj[prop] = val;
      }
      return wrap(obj[prop]);
    }
  }; // return
}
