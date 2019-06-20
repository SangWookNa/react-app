import React, { Component } from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
        Header,
        Home,        
        ImageUpload,
        VideoUpload,
      } from './containers';


class App extends Component {

  render() {
    return (   
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/:username/:seq" component={Home} />
          <Route exact path="/:username/:invitee/:seq" component={Home} />
          <Route path="/VideoUpload" component={VideoUpload} />
          <Route path="/ImageUpload" component={ImageUpload} />
        </div>
      </Router>
    );
  }
}

export default App;
