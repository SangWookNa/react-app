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
          console.log(this.props.loginStatus);
        }
      )
    }
  }

  handleLogout = (e) => {

    const url = '/api/kakao/test';    
   
    axios.post(url, {token : this.props.loginStatus.data.access_token}).then((result) => {

      console.log(result);
      this.props.history.push('/');

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Login />
        <Button onClick={this.handleLogout} >Logout</Button>
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
