import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Following from './following/Following';
import Loading from './../components/Loading';

export default class Followings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      followings: []
    };
    this.renderFollowing = this.renderFollowing.bind(this);
  }

  componentDidMount() {
    const username = this.props.match.params.username;

    axios.get(`https://api.github.com/users/${username}/following`)
      .then(({ data }) => {
        this.setState({
          loading: false,
          followings: data
        });
      }).catch((error) => {
        console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
  }

  renderFollowing(key) {
    return <Following key={key} details={this.state.followings[key]} />;
  }

  loading() {
    if (this.state.loading) {
      return <Loading state={this.state.loading} />;
    }
  }

  render() {
    const { followings } = this.state;
    if (this.state.loading) {
      return (this.loading());
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Helmet>
          <title>{this.props.match.params.username}: Followings</title>
        </Helmet>
        <Grid>
          <Row>
            <main id="main_follower-page">
              <Row>
                {Object.keys(followings).map(this.renderFollowing)}
              </Row>
            </main>
          </Row>
        </Grid>
      </ReactCSSTransitionGroup>
    );
  }
}
