import { combineReducers } from 'redux';
import { reducer as libraryReducer } from './actions/library';
import { reducer as lyricsReducer } from './actions/lyrics';

export default combineReducers({
    media: libraryReducer,
    lyrics: lyricsReducer
});