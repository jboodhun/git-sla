import { createStore } from 'redux-dynamic-reducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from '../reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger({

});

/*
const configureStore = (initialState) => {
  const store = createStore(
  	createReducer(),
  	initialState,
       	applyMiddleware(thunk, logger)
  );

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store;
};

export default configureStore;
*/

export default function configureStore(initialState) {
    return createStore(
        createReducer,
        initialState,
       	applyMiddleware(thunk, logger)
      	//applyMiddleware(thunk)
    );
}

const store = configureStore();
