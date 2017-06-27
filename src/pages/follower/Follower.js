import React, { Component } from 'react';

import UserSmall from '../../components/main/UserSmall';

export default class Follower extends Component {
  render() {
    const { details } = this.props;
    return (
      <UserSmall info={details} />
    );
  }
}
