import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger({

});

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger)
      	//applyMiddleware(thunk)
    );
}

const store = configureStore();
