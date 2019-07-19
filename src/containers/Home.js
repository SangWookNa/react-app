import React, { Component } from 'react';
import {
  Video,
  Memo,
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

    //방명록 불러오기
    this.props.memoListRequest(true, undefined, undefined, id).then();
  }

  //방명록 불러오기
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
