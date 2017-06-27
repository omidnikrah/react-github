import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import notFoundSvg from '../assets/img/svg/notfound.svg';

const textStyle = {
  display: 'block',
  color: '#999'
};

export default class NotFound extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeFromBottom"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="centerAlignment">
          <img src={notFoundSvg} style={{ width: '15%' }} alt="Not Found!" />
          <span style={textStyle}>Not Found ! :(</span>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
