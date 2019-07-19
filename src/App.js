import React, { Component } from 'react';
// Router
import { Header } from './components/common/';
import { connect } from 'react-redux';
import {
  getStatusRequest,
} from '../src/actions/kakao';


class App extends Component {
  state = { foo: 'bar' }
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
        }
      }
    );
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {

      if (child.length !== 1) return React.cloneElement(child, { status : this.props.status })

    }
    );
    console.log(this.props.status);
    //console.log(childrenWithProps);
    return (
      <div>
        <Header status={this.props.status} />
        {/* {childrenWithProps} */}
        {React.Children.map(this.props.children, child => {
        if (child.length !== 1) return React.cloneElement(child, { status : this.props.status })
        }
        )}
      </div>
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
