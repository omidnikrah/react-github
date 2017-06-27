import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import axios from 'axios';

import Repository from './Repository';

export default class RepoSide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: []
    };

    this.renderRepo = this.renderRepo.bind(this);
  }
  componentDidMount() {
    axios.get(this.props.user.repos_url)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          repositories: data
        });
        // console.log(this.state.repositories);
        // console.log(this.state);
      }).catch((error) => {
        console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
  }

  renderRepo(key) {
    return <Repository key={key} details={this.state.repositories[key]} />;
  }

  render() {
    return (
      <Col xs={12} md={8}>
        <main id="main_userpage">
          <Row>
            {Object.keys(this.state.repositories).map(this.renderRepo)}
          </Row>
        </main>
      </Col>
    );
  }
}
