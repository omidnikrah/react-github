import React, { Component } from 'react';
import axios from 'axios';

import Users from './../components/Users';
import Loading from './../components/Loading';
import NotFound from './../components/NotFound';
import Notification from './../components/Notification';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      result: false,
      loading: false,
      notfound: false,
      users: [],
      page: 1,
      notification: {
        status: false,
        type: '',
        text: ''
      }
    };

    this.searchSubmit = this.searchSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.loading = this.loading.bind(this);
    this.prevPaginate = this.prevPaginate.bind(this);
    this.nextPaginate = this.nextPaginate.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  loading() {
    if (this.state.loading) {
      return <Loading state={this.state.loading} />;
    }
  }

  submitForm() {
    if (this.state.result) {
      return <Users users={this.state.users} />;
    }
  }

  notFound() {
    if (this.state.notfound) {
      return <NotFound />;
    }
  }


  searchSubmit(event) {
    event.preventDefault();
    const $username = event.target.search.value;
    this.setState({
      loading: true,
      notfound: false,
      result: false,
      username: $username
    });
    this.fetchData($username, this.state.page);
  }

  fetchData(username, page) {
    axios.get(`https://api.github.com/search/users?q=${username}&per_page=5&page=${page}`).then(({ data }) => {
      if (Object.keys(data.items).length) {
        this.setState({
          result: true,
          notfound: false,
          loading: false,
          users: data.items
        });
        this.submitForm();
      } else {
        this.setState({
          notfound: true,
          loading: false,
          result: false
        });
        this.notFound();
      }
    }).catch((error) => {
      switch (error.response.status) {
        case 403:
          this.setState({
            notification: {
              status: true,
              type: 'danger',
              text: 'Oops! Server Error!'
            }
          });
          this.notification();
          setTimeout(() => { this.setState({ notification: { status: false } }); }, 5000);
          break;
        default:
          console.log(error.response);
      }
      if (!error.response.status) {
        this.setState({
          notification: {
            status: true,
            type: 'danger',
            text: 'Oops! Network Connection Error!'
          }
        });
        this.notification();
      }
    //   console.log(error.response.status);
    });
  }


  notification() {
    const { status, type, text } = this.state.notification;
    // console.log(`${status}, ${type}`);
    if (status) {
      return <Notification type={type} text={text} />;
    }
  }


  prevPaginate() {
    if (this.state.page > 1) {
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <button className="pagination-button" onClick={() => { this.paginate('prev'); }}>Previous</button>
        </ReactCSSTransitionGroup>
      );
    }
  }

  nextPaginate() {
    return <button className="pagination-button" onClick={() => { this.paginate('next'); }}>Next</button>;
  }

  paginate(state) {
    this.setState({
      loading: true
    });
    const $username = this.state.username;
    switch (state) {
      case 'prev':
        this.setState({
          page: this.state.page - 1,
          loading: false
        },
        this.fetchData($username, this.state.page - 1)
        );
        break;
      case 'next':
        this.setState({
          page: this.state.page + 1,
          loading: false
        },
        this.fetchData($username, this.state.page + 1)
        );
        break;
      default:
        console.log('what?');
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <main className="container">
          <form id="searchForm" onSubmit={this.searchSubmit}>
            <input type="text" name="search" placeholder="Username? 🤔" autoFocus />
          </form>
          {this.submitForm()}
          {this.notFound()}
          {this.loading()}
          <div id="pagination">
            {this.prevPaginate()}
            {this.nextPaginate()}
          </div>

          {this.notification()}
        </main>
      </ReactCSSTransitionGroup>
    );
  }
}
