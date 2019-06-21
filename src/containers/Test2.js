import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import qs from 'query-string';

class Test2 extends Component {

  componentDidMount() {

    console.log(this.props);
    
    if (JSON.stringify(this.props) !== JSON.stringify({})) {

      let grant_type = 'authorization_code';
      let client_id = '9e7171f1d9599641378cd3e36174adbc';
      let redirect_uri = 'http://localhost:3000/oauth';
      let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;

      const url = 'https://kauth.kakao.com/oauth/token';
      const config = {
        crossDomain: true
      }

      console.log(grant_type);
      console.log(client_id);
      console.log(redirect_uri);
      console.log(code);

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: grant_type,
          client_id: client_id,
          redirect_uri: redirect_uri,
          code: code,
        })
      })

      // return axios.post(url, { grant_type, client_id, redirect_uri, code },config ).then((result) => {

      //   console.log(result);

      // }).catch((error) => {
      //   // handle error
      //   alert(error);

      // })

    }

  }

  handleUpload = (e) => {
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=9e7171f1d9599641378cd3e36174adbc&redirect_uri=http://localhost:3000/oauth&response_type=code';


    window.location.href = url;
    // return axios.get(url).then((result) => {  

    // }).catch((error) => {
    //     // handle error
    //     alert(error);

    // })
  }


  render() {

    return (
      <Button onClick={this.handleUpload} >Clicks</Button>
    );
  }
}


export default Test2;
