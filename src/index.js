import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import User from './pages/User';
import Repository from './pages/Repository';
import Followers from './pages/Followers';
import Followings from './pages/Followings';
import NotFound from './pages/NotFound';
import Header from './components/Header';


ReactDOM.render(
    <BrowserRouter>
		<div>
			<Header />
			<Route path="/" exact component={App} />
			<Switch>
				<Route path="/user/:username" component={User} />
				<Route path="/:username/followers" component={Followers} />
				<Route path="/:username/following" component={Followings} />
				<Route path="/:username/:repository" component={Repository} />
			</Switch>
			{/*<Route path="*" component={NotFound} />*/}
		</div>
     </BrowserRouter>
, document.getElementById('app'));


