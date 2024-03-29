import React, { Component } from 'react';
import {
  Video,
  Memo,
  Map,
  Invitation,
} from './';
import { connect } from 'react-redux';
import { Gallery, ImageGridList } from '../components/image/';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import { withStyles } from '@material-ui/core/styles';
import {
  imageGalleryListRequest,
  imageGridListRequest,
  imageMainRequest,
} from '../actions/image';
import {
  memoListRequest,
} from '../actions/memo';
import {
  userinfoGetRequest,
} from '../actions/userinfo';
//import moment from 'moment';
const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pos2: {
    marginBottom: 5,
    fontSize: 14,
    paddingBottom: '2%',
},
});
class Home extends Component {
  state = {
    currentImage: 0,
    imageMainData: [{ src: "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg" }],
    imagesGalleryData: [],
    imagesGridData: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
    thumbnailImages: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
    weather: {},
    gubn: '',
    dayDiff: -1,
  };

  componentDidMount() {

    //데이터 셋팅
    this.dataSetting();

  }

  //데이터 불러오기
  dataSetting = () => {

    const id = this.props.match.params.enterid;
    const origin = window.location.origin;
    console.log('### : '+id);
    console.log(this.props.match.params);
    console.log('### : '+origin);
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

    //사진불러오기(갤러리)
    this.props.imageGalleryListRequest(id, 'gallery').then(
      () => {
        const images = this.props.imageGalleryData.map((data) => {
          let obj = {};
          obj.original = `${origin}/${data.path}`;
          obj.thumbnail = `${origin}/${data.thumbnailpath}`;

          return obj;
        });

        this.setState({
          imagesGalleryData: images,
        });
      }
    );

    //사진불러오기(그리드)
    this.props.imageGridListRequest(id, 'gallery').then(
      () => {

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
          obj.style = {borderRadius:'20px', margin:10,cursor: 'pointer'};
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

    //유저정보 불러오기
    this.props.userinfoGetRequest(id).then(
      () => {

        if (this.props.userData.status === 'SUCCESS') {
          let y = this.props.userData.data.y;
          let x = this.props.userData.data.x;

          // 마커가 표시될 위치입니다 
          var markerPosition = new window.kakao.maps.LatLng(y, x);
          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
              center: new window.kakao.maps.LatLng(y, x), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
              marker: marker
            };
          new window.kakao.maps.StaticMap(mapContainer, mapOption); // 지도를 생성합니다

          //const today = moment().format('YYYY-MM-DD');
          //const marryDate = moment(this.props.userData.data.marry_date_time).format('YYYY-MM-DD');

          //const dayDiff = moment(marryDate).diff(today, 'days');

          // if (dayDiff === 0){
          //   //날씨정보 불러오기(현재 날씨) 시간별
          //   let weather_url = `${value.TMAP_NAVIGATION_URL}/weather/current/hourly?appKey=${value.TMAP_APP_KEY}&version=1&lon=${this.props.userData.data.x}&lat=${this.props.userData.data.y}`
          //   axios.get(weather_url).then((result) => {
          //     console.log('현재 날씨');
          //     console.log(result.data);
          //     this.setState({
          //       weather : result.data,
          //       gubn : 'today',
          //       dayDiff : 0
          //     });

          //   }).catch((error) => {
          //     // handle error
          //     alert(error);
          //   })
          // }

        } else {
          alert("사용자정보불러오기 실패");
        }
      });

    //방명록 불러오기
    this.props.memoListRequest(true, undefined, undefined, id).then(
      () => {

      });

  }

  //방명록등록수정삭제 후 불러오기
  handleMemoList = () => {
    let id = this.props.match.params.enterid;

    return this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  render() {
    const video = (<Video data={this.props.match.params} />);
    const { classes } = this.props;
    return (
      <div style={{ flexGrow: 1 }}>
        <Invitation userData={this.props.userData} images={this.state.imageMainData} />
        {this.props.match.path !== '/Home/:enterid' ? video : undefined}
        {/* <Gallery images={this.state.imagesGalleryData} /> */}
        <ImageGridList
          images={this.state.imagesGridData}
          thumbnailImages={this.state.thumbnailImages} />
        <Map userData={this.props.userData} weather={this.state.weather} dayDiff={this.state.dayDiff} />
        
        <Typography variant="h4"  style={{ paddingLeft: '1%',paddingBottom: '5%' }}>
            <CallIcon /> contact
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              연락처
            </Typography>
            <Typography  component="h4">
              신랑
            </Typography>
            <TextField
                className={classes.pos2}
                multiline
                InputProps={{
                    classes: {
                      input: classes.pos2,
                    },
                  }}
                fullWidth
                defaultValue="Disabled" disabled
                value=' 010-4092-1808'
            />           
            <Typography  component="h4">
              신부
            </Typography>
            <TextField
                className={classes.pos2}
                multiline
                InputProps={{
                    classes: {
                      input: classes.pos2,
                    },
                  }}
                fullWidth
                defaultValue="Disabled" disabled
                value=' 010-3101-2120'
            />
            {/* <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
          </CardContent>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              마음 전하실 곳
            </Typography>
            <Typography  component="h4">
              신랑
            </Typography>
            <TextField
                className={classes.pos2}
                multiline
                InputProps={{
                    classes: {
                      input: classes.pos2,
                    },
                  }}
                fullWidth
                defaultValue="Disabled" disabled
                value=' 카카오뱅크 3333-03-0448209 (나상욱)
                새마을금고 3333-03-0448209 (나복수)'
            />           
            <Typography  component="h4">
              신부
            </Typography>
            <TextField
                className={classes.pos2}
                multiline
                InputProps={{
                    classes: {
                      input: classes.pos2,
                    },
                  }}
                fullWidth
                defaultValue="Disabled" disabled
                value=' 카카오뱅크 3333-03-0448209 (이다은)
                새마을금고 3333-03-0448209 (박경임)'
            />
            {/* <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
          </CardContent>         
        </Card>
        <Memo
          enterid={this.props.match.params.enterid}
          memoData={this.props.memoData}
          onList={this.handleMemoList} />
      </div>

    );
  }
}

Home.defaultProps = {

  enterid: '홍길동',
  invitee: '나상욱',
  seq: '1',

}

const mapStateToProps = (state) => {
  return {
    imageGridData: state.image.gridList.data,
    imageMainData: state.image.mainList.data,
    imageGalleryData: state.image.galleryList.data,
    memoData: state.memo.list.data,
    userData: state.userinfo.get,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageGalleryListRequest: (enterid, uploadFlag) => {
      return dispatch(imageGalleryListRequest(enterid, uploadFlag))
    },
    imageGridListRequest: (enterid, uploadFlag) => {
      return dispatch(imageGridListRequest(enterid, uploadFlag))
    },
    imageMainRequest: (enterid, uploadFlag) => {
      return dispatch(imageMainRequest(enterid, uploadFlag))
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username))
    },
    userinfoGetRequest: (userid) => {
      return dispatch(userinfoGetRequest(userid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(Home)));
