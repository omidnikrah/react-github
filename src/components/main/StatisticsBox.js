import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

export default class StatisticsBox extends Component {
	constructor(props){
		super(props);
		
		this.renderValue = this.renderValue.bind(this);
	}

	renderValue(){
		const { link, value } = this.props;
		if(link){
			return(
				<Link to={link}>
					<span className="user-follow-bold-num">{value}</span>
				</Link>
			);
		}
		return <span className="user-follow-bold-num">{value}</span>;
	}

	render(){
		return (
			<Col xs={12} md={4}>
				{this.renderValue()}
				<span className="user-follow-title">{this.props.title}</span>
			</Col>
		);
	}
}