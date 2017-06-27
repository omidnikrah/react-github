import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomeBtn extends Component{
	render(){
		return(
			<Link className="header_btn-main header_btn-home" to="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="360" height="360"><path d="M352.163 163.115L198.919 9.871c-10.449-10.449-27.389-10.449-37.838 0L7.837 163.115a26.756 26.756 0 0 0 18.919 45.674h20.762v114.574c0 19.112 15.493 34.603 34.603 34.603h195.758c19.11 0 34.603-15.492 34.603-34.603V208.789h20.762a26.757 26.757 0 0 0 18.919-45.674zm-131.732 144.67h-80.862v-45.583c0-22.33 18.102-40.431 40.431-40.431s40.431 18.1 40.431 40.431v45.583z" fill="#CFCFCF"/></svg>
			</Link>
		);
	}
}