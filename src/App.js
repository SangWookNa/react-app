import React, { Component } from 'react';
// Router
import { Header } from './components/common/';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { getStatusRequest,} from '../src/actions/kakao';


class App extends Component {

  componentDidMount() {

    //쿠키 가져오기
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    //get loginData from cookie
    let loginData = getCookie('key');

    //if loginData is undefined, do nothing
    if (typeof loginData === "undefined") {
      return;
    }

    //decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    //if not logged in, do nothing
    //console.log(loginData);
    if (!loginData.isLoggedIn) {
      return;
    }

    if (loginData.isLoggedIn && this.props.location.pathname === '/') {
      window.location.href = window.location.origin + '/Main';
      return;
    }

    //세션가져오기
    //page refreshed & has a session in cookie,
    //check whether this cookie is valid or not
    this.props.getStatusRequest().then(
      () => {
        if (this.props.status.valid) {
          console.log(this.props.status);
          //if session is not valid
        } else {
          //logout the session
          let loginData = {
            isLoggedIn: false,
            userid: '',
          };
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          //if loginData is undefined, do nothing
          if (this.props.location.pathname.substring(1, 5) !== 'Home'
            && this.props.location.pathname.substring(1, 5) !== '') {
            alert("세션정보가 없습니다. 로그인페이지로 이동합니다.");
            window.location.href = window.location.origin;
            return;
          }
        }
      }
    );
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#cfd8dc',
        },
        secondary: {
          main: '#cfd8dc',
        },
      },
    });

    const header = (<Header path={this.props.location.pathname.substring(1, 5)} status={this.props.status} />);

    //children 컴포넌트에 props를 전달하기위함
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.length !== 1) return React.cloneElement(child, { status: this.props.status })
    }
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ maxWidth: 700 }}>
          {this.props.location.pathname.substring(1, 5) !== 'Home'
            && this.props.location.pathname.substring(1, 5) !== '' ? header : undefined}
          {childrenWithProps}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.kakao.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);