/* Combine all of our Reducers here */
import { combineReducers } from 'redux';
import home from './reducer-filters';

const createReducer = asyncReducers =>
  combineReducers({
    home,
    ...asyncReducers
  });

export default createReducer;
