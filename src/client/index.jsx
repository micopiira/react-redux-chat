import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers';
import {Router, browserHistory} from 'react-router';
import createLogger from 'redux-logger';
import Routes from '../routes';
import thunk from 'redux-thunk';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(combineReducers(reducers), preloadedState, applyMiddleware(thunk, createLogger()));

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={Routes}/>
	</Provider>,
	document.getElementById('root')
);