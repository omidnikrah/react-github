import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Notification extends Component {
  render() {
    const { details } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear
        transitionLeave
        transitionAppearTimeout={500}
      >
        <div className={`notification notification-${details.type}`}>
          <span>{details.text}</span>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
