import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import qs from 'query-string';

class Test2 extends Component {
  state = {
    result: {}
  }

  componentDidMount() {

    console.log(this.props);

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

  handleLogout = (e) => {

    const url = '/api/kakao/test';    
   
    axios.post(url, {token : this.state.result.access_token}).then((result) => {

      console.log(result);

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }


  render() {

    return (
      <Button onClick={this.handleLogout} >Logout</Button>
    );
  }
}


export default Test2;
