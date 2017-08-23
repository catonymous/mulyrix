import { states, perform } from './api-action'; 

const initialState = {
    check: states.initial,
    scan: states.initial,
    library: null
};

const CHECK_MEDIA = 'CHECK_MEDIA';
const SCAN_MEDIA = 'SCAN_MEDIA';

export function checkMedia() {
  return perform(CHECK_MEDIA, '/api/library/check');
}

export function scanMedia() {
  return perform(SCAN_MEDIA, '/api/library/scan');
}
  
export function reducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_MEDIA:
            return Object.assign({}, state, { check: action.state }, action.state.done ? { library: action.result } : {});
        case SCAN_MEDIA:
            return Object.assign({}, state, { scan: action.state }, action.state.done ? { library: action.result } : {});
        default:
            return state;
    }
};
