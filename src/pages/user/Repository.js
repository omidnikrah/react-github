import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Colors from '../../assets/json/color.json';

export default class Repository extends Component {
  findLangColor(language) {
    return Colors[language];
  }

  render() {
    const { details } = this.props;
    console.log(details);
    return (
      <Col xs={12} md={6} className="user_repos-parent">
        <Link to={`/${details.owner.login}/${details.name}`}><article className="user_repos">
          <h3>{details.name}</h3>
          <p>{details.description}</p>
          <span className="repository-update-time">Last update: {moment(details.pushed_at).fromNow()}</span>
          <div className="starFork_container">
            <span className="span_starFork"><span className="bold">{details.stargazers_count}</span> Star</span>
            <span className="span_starFork">{details.forks} Fork</span>
            <span className="span_language-name" style={{ backgroundColor: this.findLangColor(details.language) }}>{details.language}</span>
          </div>
        </article></Link>
      </Col>
    );
  }
}
