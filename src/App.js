import React, { Component } from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
        Header,
        Home,        
        ReactFileUpload
      } from './containers';


class App extends Component {

  render() {
    return (   
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/ImageUpload" component={ReactFileUpload} />
        </div>
      </Router>
    );
  }
}

export default App;
