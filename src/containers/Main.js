import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';

import { VideoUpload, Switches } from './';
import { connect } from 'react-redux';
import {
  imageMainRequest,
  imageGalleryListRequest,
} from '../actions/image';
import {
  userinfoGetRequest,
} from '../actions/userinfo';

const styles = theme => ({
  button: {
    margin: '0px',
    float: 'right'
  },
  item: {
    color: 'inherit',
    textDecoration: 'none',
  },
  card: {
    margin: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    //backgroundColor: red[500],
  },

});

class Main extends Component {
  state = {
    imageMainData: [{ src: "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg" }],
    userInfoYn: 'N',      //예식정보등록여부
    mainYn: 'N',          //메인사진등록여부
    galleryYn: 'N',       //사진첩 등록 여부
    bgcolor: 'red',
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

    //decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

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
    this.props.imageMainRequest(id, 'main').then(() => {
      const images = this.props.imageMainData.map((data) => {
        let obj = {};
        obj.src = `${origin}/${data.path}`;
        return obj;
      });

      if (this.props.imageMainData.length > 0) {
        this.setState({
          imageMainData: images,
          mainYn: 'Y',
        });
      }
    });
    //유저정보 불러오기
    this.props.userinfoGetRequest(id).then(() => {
      if (this.props.userData.data !== null) {
        this.setState({
          userInfoYn: 'Y',
        });
      }
    });
    //사진불러오기(갤러리)
    this.props.imageGalleryListRequest(id, 'gallery').then(() => {
      if (this.props.imageGalleryData.length > 0) {
        this.setState({
          galleryYn: 'Y',
        });
      }
    });
  }

  //방명록 불러오기
  handleMemoList = () => {
    let id = this.props.status.info.userid;

    return this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  handlePage = (page) => {
    if (page === 'ImageUpload') {
      if (this.state.userInfoYn === 'N') {
        alert('예식정보를 먼저 등록해주세요');
        return;
      }
    }
    this.props.history.push(`/${page}`);
  }

  getStyles = () => {
    return Object.assign(
      {},
      this.state.mainYn === 'Y' && styles.red,
    );
  }
  render() {
    const { classes } = this.props;
    
    const userInfoContent = this.state.userInfoYn === 'Y' ? '등록완료' : '예식정보를 등록해주세요.';
    var photoContent = '웨딩사진을 등록해주세요.';
    if (this.state.mainYn === 'Y' && this.state.galleryYn === 'N') {
      photoContent = '사진첩을 등록해주세요'
    } else if (this.state.mainYn === 'N' && this.state.galleryYn === 'Y') {
      photoContent = '메인사진을 등록해주세요'
    } else if (this.state.mainYn === 'Y' && this.state.galleryYn === 'Y') {
      photoContent = '등록완료'
    }


    const videoUpload = (<VideoUpload
      id={this.props.status.info.userid}
      images={this.state.imageMainData}
      mainYn={this.state.mainYn}
      galleryYn={this.state.galleryYn} />);
    const mapUplaod = (<Card className={classes.card} style={this.state.userInfoYn === 'Y' ? { backgroundColor: '#CEF6D8' } : {}}>
      <CardActionArea onClick={() => this.handlePage('MapUpload')}>

        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>1</Avatar>
          }
          title="예식 정보 등록"
          subheader={userInfoContent}
        />
      </CardActionArea>
    </Card>);
    const imageUplaod = (<Card className={classes.card} style={this.state.mainYn === 'Y' && this.state.galleryYn === 'Y' ? { backgroundColor: '#CEF6D8' } : {}} >

      <CardActionArea onClick={() => this.handlePage('ImageUpload')}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>2</Avatar>
          }
          title="웨딩 사진 등록"
          subheader={photoContent}
        />
      </CardActionArea>

    </Card >);

    return (
      <div style={{ flexGrow: 1 }}>
        {mapUplaod}
        {this.state.userInfoYn === 'Y' ? imageUplaod : undefined}
        {this.state.mainYn === 'Y' && this.state.galleryYn === 'Y' ? videoUpload : undefined}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.kakao.status,
    imageMainData: state.image.mainList.data,
    imageGalleryData: state.image.galleryList.data,
    userData: state.userinfo.get,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageMainRequest: (enterid, uploadFlag) => {
      return dispatch(imageMainRequest(enterid, uploadFlag))
    },
    userinfoGetRequest: (userid) => {
      return dispatch(userinfoGetRequest(userid));
    },
    imageGalleryListRequest: (enterid, uploadFlag) => {
      return dispatch(imageGalleryListRequest(enterid, uploadFlag))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
