import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repCount: 0
    };
  }
  componentDidMount() {
    this.setState({
      repCount: this.getRepositories(this.props.details)
    });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({
      repCount: this.getRepositories(nextProps.details)
    });
  }


  getRepositories({ login }) {
    axios.get(`https://api.github.com/users/${login}/repos`)
      .then(({ data }) => {
        this.setState({
          repCount: Object.keys(data).length
        });
      }).catch((error) => {
        console.log(error);
      });
  }


  render() {
    const details = this.props.details;
    return (
      <li className="git-user">
        <Link to={`/user/${details.login}`}>
          <figure className="git-user-avatar">
            <img src={details.avatar_url} alt={details.login} />
          </figure>
          <span className="git-user-name">{ details.login }</span>

          <span className="git-rep-count">
            {((this.state.repCount) >= 30) ? `+${this.state.repCount}` : this.state.repCount}
          </span>
        </Link>
      </li>
    );
  }
}
