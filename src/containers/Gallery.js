import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from 'react-redux';
import {
  imageListRequest,
} from '../actions/image';

class Gallery extends React.Component {

  componentDidMount() {

    this.props.imageListRequest('test').then(
      () => {
        
      }
    );
  }

  render() {

    const images = this.props.imageData.map((data) => {
      let obj = {};
      obj.original = data.path;
      obj.thumbnail = data.path;

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
    imageData: state.image.list.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imageListRequest: (username) => {
      return dispatch(imageListRequest(username))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);