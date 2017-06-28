import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Notification extends Component {
  render() {
    const { details } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="notification"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div key={details.type} className={`notification notification-${details.type}`}>
          <span>{details.text}</span>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
