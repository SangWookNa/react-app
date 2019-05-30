import React from 'react';
import Gallery from 'react-grid-gallery';
import { connect } from 'react-redux';
import {
  imageGridListRequest,
} from '../actions/image';

class GalleryGrid extends React.Component {

  componentDidMount() {

    this.props.imageGridListRequest('test', 'grid').then(
      () => {
        alert();
      }
    );
  }

  render() {

    const images = this.props.imageData.map((data) => {
      let obj = {};
      obj.src = data.path;
      obj.thumbnail = data.thumbnailpath;
      obj.thumbnailWidth = 200;
      obj.thumbnailHeight = 350;

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
        <Gallery
          images={images} />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryGrid);