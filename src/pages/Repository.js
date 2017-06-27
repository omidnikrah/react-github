import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Loading from './../components/Loading';
import { Helmet } from 'react-helmet';
import Colors from '../assets/json/color.json';
import UserSmall from './../components/main/UserSmall';

export default class Repository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      repository: [],
      contributors: []
    };

    this.getContributors = this.getContributors.bind(this);
    this.renderContributors = this.renderContributors.bind(this);
  }

  componentDidMount() {
    const repoName = this.props.match.params.repository;
    const repoUser = this.props.match.params.username;
    axios.get(`https://api.github.com/repos/${repoUser}/${repoName}`)
      .then(({ data }) => {
        this.setState({
          loading: false,
          repository: data
        });
        this.getContributors();
      }).catch((error) => {
        console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
    // this.getContributors();
  }


  getContributors() {
    axios.get(this.state.repository.contributors_url)
      .then(({ data }) => {
        this.setState({
          contributors: data
        });
      }).catch((error) => {
        console.log(error);
        // if (response.status === 404) {
        // 	console.log('notFound :(');
        // }
      });
  }

  findLangColor(language) {
    return Colors[language];
  }


  homepageRepoUrl(url) {
    if (url) {
      return (
        <a href={url} target="_blank" className="float-right repo_main-link" id="homepage_repo-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="533.333" height="533.333" viewBox="0 0 533.333 533.333"><path d="M455.229 78.105c50.367 50.367 78.104 117.333 78.104 188.563 0 71.229-27.739 138.194-78.104 188.561-50.368 50.366-117.333 78.104-188.562 78.104-71.229 0-138.195-27.738-188.562-78.104C27.738 404.862 0 337.896 0 266.668c0-71.229 27.736-138.196 78.104-188.563S195.438 0 266.667 0c71.229 0 138.194 27.738 188.562 78.105zm-23.571 353.554c32.843-32.843 54.681-73.754 63.686-118.262-7.019 10.331-13.732 14.165-17.888-8.961-4.281-37.703-38.911-13.618-60.688-27.011-22.919 15.447-74.43-30.032-65.676 21.263 13.507 23.137 72.921-30.964 43.307 17.99-18.893 34.176-69.085 109.86-62.555 149.093.823 57.158-58.404 11.919-78.81-7.041-13.727-37.979-4.678-104.362-40.572-122.962-38.959-1.691-72.398-5.232-87.497-48.786-9.086-31.161 9.669-77.549 43.062-84.71 48.88-30.711 66.341 35.965 112.183 37.205 14.233-14.893 53.029-19.628 56.246-36.328-30.078-5.308 38.16-25.291-2.879-36.657-22.642 2.663-37.229 23.476-25.193 41.124-43.874 10.23-45.279-63.492-87.454-40.238-1.072 36.765-68.865 11.919-23.456 4.464 15.602-6.816-25.448-26.57-3.271-22.98 10.894-.592 47.569-13.444 37.644-22.084 20.421-12.677 37.583 30.359 57.572-.98 14.431-24.097-6.052-28.546-24.141-16.332-10.198-11.418 18.006-36.081 42.882-46.738 8.29-3.552 16.208-5.487 22.263-4.939 12.531 14.475 35.703 16.982 36.916-1.741-31.031-14.861-65.247-22.712-100.672-22.712-50.845 0-99.203 16.158-139.223 46.036 10.755 4.927 16.86 11.062 6.499 18.904-8.05 23.987-40.713 56.186-69.387 51.627-14.889 25.674-24.694 53.961-28.885 83.608 24.016 7.946 29.554 23.672 24.394 28.932-12.237 10.671-19.759 25.797-23.633 42.355 7.817 47.832 30.298 91.914 65.245 126.862C145.746 475.729 204.34 500 266.667 500c62.325 0 120.92-24.271 164.991-68.341z" /></svg>
        </a>
      );
    }
  }


  loading() {
    if (this.state.loading) {
      return <Loading state={this.state.loading} />;
    }
  }


  renderContributors(key) {
    return <UserSmall key={key} info={this.state.contributors[key]} />;
  }

  render() {
    const { repository } = this.state;
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
          <title>{repository.name}</title>
        </Helmet>
        <div className="row center-xs center-md">
          <Col md={6} className="row">
            <main id="main_repository-page">
              <header id="header_repository-page">
                <div className="float-left">
                  <h1>{repository.name}</h1>
                  <p>{repository.description}</p>
                  <span className="programming_language-label" style={{ backgroundColor: this.findLangColor(repository.language) }}>{repository.language}</span>
                </div>
                <a href={repository.html_url} target="_blank" className="repo_main-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="438.549" height="438.549" viewBox="0 0 438.549 438.549"><path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" /></svg>
                </a>
                {this.homepageRepoUrl(repository.homepage)}
              </header>


              <div id="contributors">
                <header id="contributors-header">
                  <h4>Contributors:</h4>
                </header>
				<div id="contributors-content">
					<Row>
						{Object.keys(this.state.contributors).map(this.renderContributors)}
					</Row>
                </div>
              </div>
            </main>
          </Col>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
