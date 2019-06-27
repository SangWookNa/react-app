import React, { Component } from 'react';
import qs from 'query-string';
import {
  Login
} from './';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  kakaoLoginRequest,
} from '../actions/kakao';

class Main extends Component {

  componentDidMount() {

    if (this.props.location.pathname !== '/') {

      let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;

      return this.props.kakaoLoginRequest(code).then(
        () => {
          const url = '/api/kakao/me';

          axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {
      
            console.log(result.data);
            this.props.history.push('/');
      
          }).catch((error) => {
            // handle error
            alert(error);
          })
        }
      )
    }
  }

  handleLogout = (e) => {

    const url = '/api/kakao/logout';

    axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

      console.log(result);
      this.props.history.push('/');

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }
  handleTokenInfo = (e) => {

    const url = '/api/kakao/tokeninfo';

    axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

      console.log(result.data);
      this.props.history.push('/');

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }
  handleUnlink = (e) => {

    const url = '/api/kakao/unlink ';

    axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

      console.log(result.data);
      this.props.history.push('/');

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }

  // handleSend = (e) => {
  //   const url = "https://kauth.kakao.com/oauth/authorize?client_id=9e7171f1d9599641378cd3e36174adbc&redirect_uri=http://localhost:3000/oauth&response_type=code&scope=account_email";

  //   window.location.href = url;
  // }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Login />
        <Button onClick={this.handleLogout} >Logout</Button>
        <Button onClick={this.handleTokenInfo} >TokenInfo</Button>
        <Button onClick={this.handleUnlink} >Unlink</Button>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.kakao.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    kakaoLoginRequest: (code) => {
      return dispatch(kakaoLoginRequest(code))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
