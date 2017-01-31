import {Route, IndexRoute} from 'react-router';
import React from 'react';
import App from './client/components/containers/App';
import About from './client/components/containers/About';
import Chat from './client/components/containers/Chat';

const routes = <Route path="/" component={App}>
	<IndexRoute component={Chat}/>
	<Route path="/about" component={About}/>
</Route>;

export default routes;
