import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import { Login, VideoUpload, Memo, MapUpload } from './';
import { Header } from '../components/common/';
import { Gallery, ImageGridList } from '../components/image/';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  kakaoLoginRequest,
  getStatusRequest,
} from '../actions/kakao';
import {
  imageGalleryListRequest,
  imageGridListRequest,
} from '../actions/image';
import {
  memoListRequest,
} from '../actions/memo';

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
    currentImage: 0,
    imagesGalleryData: [],
    imagesGridData: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
    thumbnailImages: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
  };

  componentDidMount() {

    console.log(this.props.status);
    
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
    //console.log(loginData);
    if (!loginData.isLoggedIn) {
      alert("세션정보가 없습니다. 로그인페이지로 이동합니다.");
      window.location.href = window.location.origin;
      return;
    }
  }

  //데이터 불러오기
  dataSetting = () => {
    let id = this.props.status.info.userid;

    //사진불러오기(갤러리)
    this.props.imageGalleryListRequest(id, 'gallery').then(
      () => {
        const images = this.props.imageGalleryData.map((data) => {
          let obj = {};
          obj.original = data.path;
          obj.thumbnail = data.thumbnailpath;

          return obj;
        });

        this.setState({
          imagesGalleryData: images,
        });
      }
    );

    //사진불러오기(그리드)
    this.props.imageGridListRequest(id, 'grid').then(
      () => {
        let origin = window.location.origin;
        const images = this.props.imageGridData.map((data) => {
          let obj = {};
          obj.src = `${origin}/${data.path}`;
          obj.width = 1;
          obj.height = 1;
          return obj;
        });

        const thumbnailImages = this.props.imageGridData.map((data) => {
          let obj = {};
          obj.src = `${origin}/${data.thumbnailpath}`;
          obj.width = 4;
          obj.height = 4;
          return obj;
        });

        if (images.length > 0) {
          this.setState({
            imagesGridData: images,
            thumbnailImages: thumbnailImages,
          });
        }
      }
    );

    //방명록 불러오기
    this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  //방명록 불러오기
  handleMemoList = () => {
    let id = this.props.status.info.userid;

    return this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  render() {
    const { classes } = this.props;

    const videoUpload = (<VideoUpload id={this.props.status.info.userid} />);
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
        {/* {this.props.status.isLoggedIn === true ? <Gallery images={this.state.imagesGalleryData} /> : undefined}
        {this.props.status.isLoggedIn === true ? <ImageGridList
          images={this.state.imagesGridData}
          thumbnailImages={this.state.thumbnailImages} /> : undefined}
        {this.props.status.isLoggedIn === true ? <Memo
          enterid={this.props.status.info.userid}
          memoData={this.props.memoData}
          onList={this.handleMemoList} /> : undefined} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.kakao.login,
    status: state.kakao.status,
    imageGridData: state.image.gridList.data,
    imageGalleryData: state.image.galleryList.data,
    memoData: state.memo.list.data,
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
    imageGalleryListRequest: (enterid, uploadFlag) => {
      return dispatch(imageGalleryListRequest(enterid, uploadFlag))
    },
    imageGridListRequest: (enterid, uploadFlag) => {
      return dispatch(imageGridListRequest(enterid, uploadFlag))
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
