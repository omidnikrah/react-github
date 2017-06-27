import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet';

import Loading from './../components/Loading';
import Sidebar from './user/Sidebar';
import RepoSide from './user/RepoSide';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userinfo: []
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    const username = this.props.match.params.username;
    axios.get(`https://api.github.com/users/${username}`)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          loading: false,
          userinfo: data
        });
        // console.log(this.state);
      }).catch((error) => {
        // console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
  }

  loading() {
    if (this.state.loading) {
      return <Loading state={this.state.loading} />;
    }
  }


  render() {
    const { userinfo } = this.state;
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
        <div>
          <Helmet>
            <title>{(userinfo.name) ? userinfo.name : userinfo.login}</title>
          </Helmet>
          <Grid>
            <Row>
              <Sidebar user={userinfo} />
              <RepoSide user={userinfo} />
            </Row>
          </Grid>

        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

