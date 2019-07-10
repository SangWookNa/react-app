import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";


class Gallery extends React.Component {
  componentDidMount(){
    console.log(this.props.images);
  }
  render() {
    

    return (
      <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"
      }}>
        
        <ImageGallery items={this.props.images} />
      </div>
    );
  }
}

export default Gallery;