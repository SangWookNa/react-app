import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Test extends Component {

  handleUpload = (e) => {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=9e7171f1d9599641378cd3e36174adbc&redirect_uri=http://localhost:3000/oauth&response_type=code`;

    return axios.get(url).then((result) => {  

    }).catch((error) => {
        // handle error
        alert(error);

    })
  }


  render() {

    return (
      <Button onClick={this.handleUpload} >Click</Button>
    );
  }
}


export default Test;
