import { Route, matchPath } from 'react-router';

// https://github.com/ReactTraining/react-router/issues/31
if(matchPath('%2F', ':test').params.test !== '/') {
    const matchEncodedSlashes = Route.prototype.computeMatch;
    Route.prototype.computeMatch = function() {
      const match = matchEncodedSlashes.bind(this)(...arguments);
      if(match && match.params) {
        const params = match.params;
        for(const key in params) {
          params[key] = params[key].replace(/%2F/ig, '/');
        }
      }
      return match;
    };
}
