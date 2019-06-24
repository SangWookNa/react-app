import React, { Component } from 'react';
import axios from 'axios';
import qs from 'query-string';
import {
  Login
} from './';

class Main extends Component {

  componentDidMount() {

    console.log(this.props);
    
    if (this.props.location.pathname !== '/') {
      let grant_type = 'authorization_code';
      let client_id = '9e7171f1d9599641378cd3e36174adbc';
      let redirect_uri = 'http://localhost:3000/oauth';
      let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;

      const url = 'https://kauth.kakao.com/oauth/token';

      var data = qs.stringify({
        'grant_type': grant_type,
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'code': code
      });

      return axios.post(url, data).then((result) => {

        console.log(result.data);
        this.setState({
          result: result.data
        })

      }).catch((error) => {
        // handle error
        alert(error);
      })

    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Login />
      </div>

    );
  }
}

export default Main;
