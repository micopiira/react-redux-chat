import {Route, IndexRoute} from 'react-router';
import React from 'react';
import App from './components/containers/App';
import About from './components/containers/About';
import Chat from './components/containers/Chat';

const routes = <Route path="/" component={App}>
	<IndexRoute component={Chat}/>
	<Route path="/about" component={About}/>
</Route>;

export default routes;
