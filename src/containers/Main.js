import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import { VideoUpload } from './';
import { connect } from 'react-redux';
import {
  imageMainRequest,
} from '../actions/image';

const styles = theme => ({
  button: {
    margin: '0px',
    float: 'right'
  },
  item: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

class Main extends Component {
  state = {
    imageMainData: [{ src: "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg" }],
  };

  componentDidMount() {

    //////////////세션체크//////////////
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
      alert("세션정보가 없습니다. 로그인페이지로 이동합니다.");
      window.location.href = window.location.origin;
      return;
    }

    //decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    //if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      alert("세션정보가 없습니다. 로그인페이지로 이동합니다.");
      window.location.href = window.location.origin;
      return;
    }

    this.setState({
      userid: loginData.userid,
    })

    //데이터 셋팅
    this.dataSetting(loginData.userid);
  }
  ///////////////////////////////////
  
  //데이터 불러오기
  dataSetting = (userid) => {
    let id = userid;
    //사진불러오기(메인)
    this.props.imageMainRequest(id, 'main').then(
      () => {
        const images = this.props.imageMainData.map((data) => {
          let obj = {};
          obj.src = `${origin}/${data.path}`;
          return obj;
        });

        if (images.length > 0) {
          this.setState({
            imageMainData: images,
          });
        }
      }
    );
  }

  //방명록 불러오기
  handleMemoList = () => {
    let id = this.props.status.info.userid;

    return this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  render() {
    const { classes } = this.props;

    const videoUpload = (<VideoUpload id={this.props.status.info.userid} images={this.state.imageMainData} />);
    const mapUplaod = (<Typography variant="h6">1.예식 정보 관리
  
    <NavLink to="/MapUpload" className={classes.item} >
        <Button variant="contained" color="primary" size="small" component="span" className={classes.button}>Upload</Button>
      </NavLink>
    </Typography>);
    const imageUplaod = (<Typography variant="h6">2.웨딩 사진 관리
                          <NavLink to="/ImageUpload" className={classes.item} >
        <Button variant="contained" color="primary" size="small" component="span" className={classes.button}>Upload</Button>
      </NavLink>
    </Typography>);


    return (
      <div style={{ flexGrow: 1 }}>

        {mapUplaod}
        {imageUplaod}
        {videoUpload}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.kakao.status,
    imageMainData: state.image.mainList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageMainRequest: (enterid, uploadFlag) => {
      return dispatch(imageMainRequest(enterid, uploadFlag))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
