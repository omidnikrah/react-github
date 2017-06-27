import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

import UserSmall from '../../components/main/UserSmall';

export default class Follower extends Component {
	render(){
		const { details } = this.props;
		return (
			<UserSmall info={details}/>
		);
	}
}