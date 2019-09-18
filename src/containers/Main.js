import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    const mapUplaod = (<Card className={classes.card}>
                        <NavLink to="/MapUpload" className={classes.item} >
                          <CardActionArea>
                            <CardHeader
                              avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                  1
                          </Avatar>
                              }
                              
                              title="예식 정보 등록"
                              subheader="September 14, 2016"
                            />
                          </CardActionArea>
                        </NavLink>
                      </Card>);
    const imageUplaod = (<Card className={classes.card}>
                          <NavLink to="/ImageUpload" className={classes.item} >
                            <CardActionArea>
                              <CardHeader
                                avatar={
                                  <Avatar aria-label="Recipe" className={classes.avatar}>
                                    2
                            </Avatar>
                                }
                                title="웨딩 사진 등록"
                                subheader="September 14, 2016"
                              />
                            </CardActionArea>
                          </NavLink>
                        </Card>);


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
