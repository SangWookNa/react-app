import React, { Component } from 'react';
import logo from './../image/kakao_account_login.png';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Login extends Component { 

  handleUpload = (e) => {
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=9e7171f1d9599641378cd3e36174adbc&redirect_uri=http://localhost:3000/oauth&response_type=code';

    window.location.href = url;
  }

  render() {

    return (
      // <Button onClick={this.handleUpload} >Click</Button>
      //<img src={logo} alt="Logo" />
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    ><img src={logo} alt="Logo" />
    </Grid>
    );
  }
}


export default Login;
