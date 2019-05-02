import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = { username: null };

  componentDidMount() {
    fetch('api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <div>
            {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
