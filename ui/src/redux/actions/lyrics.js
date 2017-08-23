import { states, perform } from './api-action'; 

const initialState = {
  grab: states.initial,
  links: null
};

const GRAB_LYRICS = 'GRAB_LYRICS';

export function grabLyrics(artist, title) {
    return perform(GRAB_LYRICS, `/api/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAB_LYRICS:
      return Object.assign({}, state, { grab: action.state, links: action.state.done ? action.result : null });
    default:
      return state;
  }
};
