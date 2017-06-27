import React, { Component } from 'react';
import User from './User';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }

  getUser(key) {
    return <User key={key} details={this.props.users[key]} />;
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="row center-xs center-md">
          <ul className="col-xs-12 col-md-5">
            {Object.keys(this.props.users).map(this.getUser)}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
