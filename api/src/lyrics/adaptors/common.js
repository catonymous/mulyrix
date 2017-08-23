import proxyUrl from '../../proxy-url';

export function padAttrLinks(url) {
  return [{
    selector: '[href^="//"]',
    attr: 'href',
    replace: val => `http:${val}`
  }, {
    selector: '[href^="/"]',
    attr: 'href',
    replace: val => `${url}${val}`
  }, {
    selector: '[src^="//"]',
    attr: 'src',
    replace: val => `http:${val}`
  }, {
    selector: '[src^="/"]',
    attr: 'src',
    replace: val => `${url}${val}`
  }];
}

export function padStyleLinks(url) {
  return [{
    regex: /(url\s*\(['"]?\s*)\//g,
    replace: `$1${url}/`
  }];
}

export function proxyScript(route) {
  return {
    selector: `script[src$="${route}"]`,
    attr: 'src',
    replace: proxyUrl
  }
}

export function proxyStyle(route) {
  return {
    selector: `link[href$="${route}"]`,
    attr: 'href',
    replace: proxyUrl
  }
}
