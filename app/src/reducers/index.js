/* Combine all of our Reducers here */
/* Set initial states */
import { combineReducers } from 'redux';
import * as Github from './reducer-github.js';
import * as Update from './reducer-update.js';

const Reducers = Object.assign(Github, Update);

const allReducers = combineReducers(Reducers);


export default allReducers;
