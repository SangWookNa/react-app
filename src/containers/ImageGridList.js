import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import {
  imageGridListRequest,
} from '../actions/image';

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 300) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}

class ImageGridList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      images: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
      thumbnailImages: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {

    this.props.imageGridListRequest('test', 'grid').then(
      () => {
        const images = this.props.imageData.map((data) => {
          let obj = {};
          obj.src = data.path;
          obj.width = 1;
          obj.height = 1;
          return obj;
        });

        const thumbnailImages = this.props.imageData.map((data) => {
          let obj = {};
          obj.src = data.thumbnailpath;
          obj.width = 4;
          obj.height = 4;
          return obj;
        });

        if (images.length > 0) {
          this.setState({
            images: images,
            thumbnailImages: thumbnailImages,
          });
        }
      }
    );
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {

    // const images = this.props.imageData.map((data) => {
    //   let obj = {};
    //   obj.src = data.path;
    //   obj.width = 4;
    //   obj.height = 3;
    //   console.log(obj);
    //   return obj;
    // });
    // const images = [
    //   { src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 4, height: 3 },      
    // ];

    return (
      <div>
        <Gallery photos={this.state.thumbnailImages} onClick={this.openLightbox} margin={10} direction={"column"} columns={columns} />
        <Lightbox images={this.state.images}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    imageData: state.image.gridList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageGridListRequest: (username, uploadFlag) => {
      return dispatch(imageGridListRequest(username, uploadFlag))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGridList);