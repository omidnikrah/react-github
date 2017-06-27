import React, { Component } from 'react';
import Search from './pages/Search';

import './assets/sass/app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
		<Search />
      </div>
    );
  }
}

export default App;
