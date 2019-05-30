import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from 'react-redux';
import {
  imageGalleryListRequest,
} from '../actions/image';

class Gallery extends React.Component {

  componentDidMount() {

    this.props.imageGalleryListRequest('test','gallery').then(
      () => {
        
      }
    );
  }

  render() {

    const images = this.props.imageData.map((data) => {
      let obj = {};
      obj.original = data.path;
      obj.thumbnail = data.thumbnailpath;

      return obj;
    });    

    return (
      <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"
      }}>
        <ImageGallery items={images} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    imageData: state.image.galleryList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageGalleryListRequest: (username,uploadFlag) => {
      return dispatch(imageGalleryListRequest(username,uploadFlag))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);