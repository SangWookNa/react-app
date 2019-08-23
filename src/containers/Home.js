import React, { Component } from 'react';
import {
  Video,
  Memo,
  Map,
} from './';
import { connect } from 'react-redux';
import { Gallery, ImageGridList } from '../components/image/';
import {
  imageGalleryListRequest,
  imageGridListRequest,
} from '../actions/image';
import {
  memoListRequest,
} from '../actions/memo';
import {
  userinfoGetRequest,
} from '../actions/userinfo';
import moment from 'moment';
import axios from 'axios';
import * as value from '../globals';

class Home extends Component {
  state = {
    currentImage: 0,
    imagesGalleryData: [],
    imagesGridData: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
    thumbnailImages: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
  };

  componentDidMount() {

    //데이터 셋팅
    this.dataSetting();

  }

  //데이터 불러오기
  dataSetting = () => {

    const id = this.props.match.params.enterid;
    const origin = window.location.origin;

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
    this.props.imageGridListRequest(id, 'grid').then(
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
          var map = new window.kakao.maps.StaticMap(mapContainer, mapOption); // 지도를 생성합니다

          const today = moment().format('YYYY-MM-DD');
          const marryDate = moment(this.props.userData.data.marry_date_time).format('YYYY-MM-DD');

          const dayDiff = moment(marryDate).diff(today, 'days');
          console.log(today);
          console.log(marryDate);
          console.log(dayDiff);

          if (dayDiff > 2 && dayDiff < 11) {
            //날씨정보 불러오기
            let weather_url = `${value.TMAP_NAVIGATION_URL}/weather/forecast/6days?appKey=${value.TMAP_APP_KEY}&version=1&lon=${this.props.userData.data.x}&lat=${this.props.userData.data.y}`
            axios.get(weather_url).then((result) => {

              console.log(result.data);

            }).catch((error) => {
              // handle error
              alert(error);
            })
          }else if (dayDiff > 0 && dayDiff < 3){

          }else if (dayDiff === 0){
            
          }


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

    return (
      <div style={{ flexGrow: 1 }}>
        {this.props.match.url !== '/' ? video : undefined}
        <Gallery images={this.state.imagesGalleryData} />
        <ImageGridList
          images={this.state.imagesGridData}
          thumbnailImages={this.state.thumbnailImages} />
        <Map userData={this.props.userData} />
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
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username))
    },
    userinfoGetRequest: (userid) => {
      return dispatch(userinfoGetRequest(userid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
