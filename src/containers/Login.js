import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from './../image/kakao_account_login.png';
import qs from 'query-string';
import axios from 'axios';
import { connect } from 'react-redux';
import * as value from '../globals';
import {
  kakaoLoginRequest,
  getStatusRequest,
} from '../actions/kakao';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 500,
  },
});

class Login extends React.Component {

  componentDidMount() {
    //카카오 로그인 토큰 생성   
    let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;
    let redirectUrl = value.KAKAO_REDIRECT_URL;
    let kakaoClientId = value.KAKAO_CLIENT_ID;
    
    if (code !== '' && code !== undefined && code !== 'undefined') {
      
      return this.props.kakaoLoginRequest(code,redirectUrl,kakaoClientId).then(
        () => {
          const url = '/api/kakao/me';
          //카카오 사용자정보 가져오기
          axios.post(url, { token: this.props.loginStatus.data.access_token }).then((result) => {

            this.props.getStatusRequest().then(
              () => {
                this.props.history.push('/Main');
              }
            );

            // 쿠키 데이터 생성  
            let loginData = {
              isLoggedIn: true,
              userid: result.data.userid
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          }).catch((error) => {
            // handle error
            alert(error);
          })
        }
      )
    }
  }

  handleUpload = (e) => {
    const url = `${value.KAKAO_LOGIN_URL}?client_id=${value.KAKAO_CLIENT_ID}&redirect_uri=${value.KAKAO_REDIRECT_URL}&response_type=code`;

    window.location.href = url;
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            alignItems='center'
            direction='row'
            justify='center'
          >
            <img src={logo} alt="Logo" onClick={this.handleUpload} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.kakao.login,
    status: state.kakao.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    kakaoLoginRequest: (code,redirectUrl,kakaoClientId) => {
      return dispatch(kakaoLoginRequest(code,redirectUrl,kakaoClientId))
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
