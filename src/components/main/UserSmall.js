import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

export default class UserSmall extends Component {
	render(){
		const {info} = this.props;
		return(
			<Col xs={6} md={2}>
				<Link to={`/user/${info.login}`}  className="user_follow-small">
					<img src={info.avatar_url} alt={info.login} width="50" />
					<h3>{info.login}</h3>
				</Link>
			</Col>
		);
	}
}