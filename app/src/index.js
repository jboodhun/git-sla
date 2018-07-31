import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
// =============================
	// Lets Add the Redux stuff.
// =============================
// Create the Store for Data and states. createStore is a built in Redux function.
import { createStore, applyMiddleware } from 'redux'; // With curly braces, you can already use CreateStore instead of defining it as var x = redux.createStore
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import configureStore from './store/configureStore';

// We will instantiate this once. We don't want to change this value all the time. So we use const.
// Remember, the store is only ONE big Object.
// Only pass one object.
// So we need to combine all of our Data objects into one.
const store = configureStore();

// Containers
import Full from './containers/Full/';

const history = createBrowserHistory();
const config = app.deployConfig; // Variables from from scripts/app.js

ReactDOM.render((
	  <div>
		  <Provider store={store}>
			  <Router history={history}>
			    <Switch>
			      <Route path="/" name="Home" component={Full}/>
			    </Switch>
			  </Router>
		  </Provider>
	  </div>
), document.getElementById('root'));
