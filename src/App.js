import React, { Component } from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './containers/Header';
import Home from './containers/Home';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
