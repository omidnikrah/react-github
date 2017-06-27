import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Follower from './follower/Follower';
import Loading from './../components/Loading';

export default class Followers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      followers: []
    };
    this.renderFollower = this.renderFollower.bind(this);
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    axios.get(`https://api.github.com/users/${username}/followers`)
      .then(({ data }) => {
        this.setState({
          loading: false,
          followers: data
        });
      }).catch((error) => {
        console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
  }

  renderFollower(key) {
    return <Follower key={key} details={this.state.followers[key]} />;
  }


  loading() {
    if (this.state.loading) {
      return <Loading state={this.state.loading} />;
    }
  }

  render() {
    const { followers } = this.state;
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
          <title>{this.props.match.params.username}: Followers</title>
        </Helmet>
        <Grid>
          <Row>
            <main id="main_follower-page">
              <Row>
                {Object.keys(followers).map(this.renderFollower)}
              </Row>
            </main>
          </Row>
        </Grid>
      </ReactCSSTransitionGroup>
    );
  }
}
