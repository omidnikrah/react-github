import React from 'react';

const Loading = props => (
  <div className={`loader ${(props.state) ? 'loadingOn' : ''}`}>
    <span>&#123;</span><span>&#125;</span>
  </div>
);

export default Loading;
