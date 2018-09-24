import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import svgLink from './../../assets/img/svg/link.svg';
import StatisticsBox from './../../components/main/StatisticsBox';

export default class Sidebar extends Component {
  userSite({ blog, name }) {
    if (blog) {
      const containProtocol = blog.indexOf("http://") === 0 || blog.indexOf("https://") === 0;
      if(!containProtocol) {
        blog = 'http://' + blog;        
      }
      return (
        <div>
          <a href={blog} target="_blank" id="user-site">
            <img src={svgLink} alt={`${name} website`} />
          </a>
        </div>
      );
    }
  }

  render() {
    const { user } = this.props;
    return (
      <Col xs={12} md={4}>
        <aside id="userSide">
          <figure id="user-photo">
            <img src={user.avatar_url} alt={user.name} />
            {this.userSite(user)}
          </figure>
          <div id="user-info">
            <h1>{user.name}</h1>
            <span>{user.bio}</span>
          </div>
          <div id="user-follow">
            <Row>
              <StatisticsBox
                title="Repositories"
                value={user.public_repos}
              />
              <StatisticsBox
                title="Follower"
                value={user.followers}
                link={`/${user.login}/followers`}
              />
              <StatisticsBox
                title="Following"
                value={user.following}
                link={`/${user.login}/following`}
              />
            </Row>
          </div>
        </aside>
      </Col>
    );
  }
}
