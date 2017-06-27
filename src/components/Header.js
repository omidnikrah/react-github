import React, { Component } from 'react';
import BackBtn from './../components/main/BackBtn';
import HomeBtn from './../components/main/HomeBtn';

export default class Header extends Component {

	handleHeaderBtns(){
		if(location.pathname != '/'){
			return (
				<div>
					<HomeBtn />
					<BackBtn />
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<header id="header">
					<h1>React GitHub</h1>
				</header>
				{this.handleHeaderBtns()}
			</div>
		);
	}
}
