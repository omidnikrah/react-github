import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default class Notification extends Component {
  render() {
    const { type, text } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="notification"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div className={`notification notification-${type}`}>
          <span>{text}</span>
        </div>
      </CSSTransitionGroup>
    );
  }
}
