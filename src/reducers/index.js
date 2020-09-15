import { combineReducers } from 'redux';
import { newsReducers } from './newsReducers';

const allReducer = combineReducers({
    newsReducers
});

export default allReducer;