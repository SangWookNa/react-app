import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Typography from '@material-ui/core/Typography';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

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
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
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

    return (
      <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        marginTop: 100, marginBottom: 100
      }}>
        <Typography variant="h4"  style={{ paddingLeft: '1%',paddingBottom: '5%' }}>
          <LibraryBooks /> gallery
        </Typography>
        <Gallery photos={this.props.thumbnailImages} onClick={this.openLightbox} margin={10} direction={"column"} columns={columns} />
        <Lightbox images={this.props.images}
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

export default (ImageGridList);