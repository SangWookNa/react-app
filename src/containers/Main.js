import React, { Component } from 'react';
import qs from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import {
  Login,
  VideoUpload,
  Header,
  Gallery,
  ImageGridList
} from './';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  kakaoLoginRequest,
  getStatusRequest
} from '../actions/kakao';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  item: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

class Main extends Component {

  componentDidMount() {
    
    //카카오 로그인 리다이렉트
    if (this.props.location.pathname !== '/') {

      let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;
      //카카오 로그인 토큰 생성
      return this.props.kakaoLoginRequest(code).then(
        () => {
          const url = '/api/kakao/me';
          //카카오 사용자정보 가져오기
          axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

            // 쿠키 데이터 생성
            let loginData = {
              isLoggedIn: true,
              username: result.data._id
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            this.props.history.push('/');

          }).catch((error) => {
            // handle error
            alert(error);
          })
        }
      )
    }
    //쿠키 가져오기
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    //get loginData from cookie
    let loginData = getCookie('key');

    //if loginData is undefined, do nothing
    if (typeof loginData === "undefined") return;

    //decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    //if not logged in, do nothing
    //console.log(loginData);
    if (!loginData.isLoggedIn) return;

    if (this.props.loginStatus.data.access_token !== '') {
      //page refreshed & has a session in cookie,
      //check whether this cookie is valid or not
      this.props.getStatusRequest().then(
        () => {
          //if session is not valid
          if (!this.props.status.valid) {
            //logout the session
            loginData = {
              isLoggedIn: false,
              username: '',
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            alert();
            // and notify
            //let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
            //Materialize.toast($toastContent, 4000);
          }
        }
      );
    }


    console.log(this.props.status.info._id);
    
  }

  handleLogout = (e) => {

    const url = '/api/kakao/logout';

    axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

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
    const { classes } = this.props;

    const imageUplaod = (<Typography variant="h6">사진을 등록 해주세요
                          <NavLink to="/ImageUpload" className={classes.item} >
                              <Button variant="contained" color="primary" component="span" className={classes.button}>Upload</Button>
                          </NavLink>
                        </Typography>);
    const videoUpload = (<VideoUpload id={this.props.status.info._id} />);
    
    return (
      <div style={{ flexGrow: 1 }}>
        <Header userInfo={this.props.status} />
        <div>{this.props.status.info._id}</div>
        {this.props.status.isLoggedIn === true ? undefined : <Login />}
        {this.props.status.isLoggedIn === true ? videoUpload : undefined}
        {this.props.status.isLoggedIn === true ? imageUplaod : undefined}
        {this.props.status.isLoggedIn === true ? <Gallery userInfo = {this.props.status.info._id} /> : undefined}
        {this.props.status.isLoggedIn === true ? <ImageGridList userInfo = {this.props.status} /> : undefined}
        
        {/* <Button onClick={this.handleLogout} >Logout</Button>
        <Button onClick={this.handleTokenInfo} >TokenInfo</Button>
        <Button onClick={this.handleUnlink} >Unlink</Button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.kakao.login,
    status: state.kakao.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    kakaoLoginRequest: (code) => {
      return dispatch(kakaoLoginRequest(code))
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
