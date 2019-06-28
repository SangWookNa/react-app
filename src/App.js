import React, { Component } from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
        Home,        
        ImageUpload,
        VideoUpload,
        Main,
      } from './containers';


class App extends Component {

  render() {
    return (   
      <Router>
        <div>
          <Route exact path="/" component={Main} />
          <Route exact path="/oauth" component={Main} />
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
