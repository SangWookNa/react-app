import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import Typography from '@material-ui/core/Typography';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

class Gallery extends React.Component {
  render() {
    

    return (
      <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        overflow: "auto",
        marginTop: 100, marginBottom: 100
      }}>
        <Typography component="h2" style={{ paddingLeft: '2%',paddingBottom: '5%' }}>
          <LibraryBooks /> gallery
        </Typography>
        <ImageGallery items={this.props.images} />
      </div>
    );
  }
}

export default Gallery;