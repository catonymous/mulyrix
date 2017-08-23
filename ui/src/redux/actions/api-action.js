export const states = Object.freeze({
  initial: Object.freeze({ pending: false, done: false, error: null }),
  started: Object.freeze({ pending: true, done: false, error: null }),
  done: Object.freeze({ pending: false, done: true, error: null }),
  failed: error => Object.freeze({ pending: false, done: true, error })
});

export function perform(type, url) {
  return dispatch => {
    dispatch({type, state: states.started});
    fetch(url).then(response => response.json())
        .then(result =>  dispatch({type, result, state: states.done}))
        .catch(error => dispatch({type, state: states.failed(error)}));
  }
}
