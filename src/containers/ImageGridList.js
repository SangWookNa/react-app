import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import {
  imageGridListRequest,
} from '../actions/image';

/* popout the browser and maximize to see more columns! -> */
const photos = [
  { src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/Dm-qxdynoEc/800x799", width: 1, height: 1 },
  { src: "https://source.unsplash.com/qDkso9nvCg0/600x799", width: 3, height: 4 },
  { src: "https://source.unsplash.com/iecJiKe_RNg/600x799", width: 3, height: 4 },
  { src: "https://source.unsplash.com/epcsn8Ed8kY/600x799", width: 3, height: 4 },
  { src: "https://source.unsplash.com/NQSWvyVRIJk/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/zh7GEuORbUw/600x799", width: 3, height: 4 },
  { src: "https://source.unsplash.com/PpOHJezOalU/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/I1ASdgphUH4/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/XiDA78wAZVw/600x799", width: 3, height: 4 },
  { src: "https://source.unsplash.com/x8xJpClTvR0/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/qGQNmBE7mYw/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/NuO6iTBkHxE/800x599", width: 4, height: 3 },
  { src: "https://source.unsplash.com/pF1ug8ysTtY/600x400", width: 4, height: 3 },
  { src: "https://source.unsplash.com/A-fubu9QJxE/800x533", width: 4, height: 3 },
  { src: "https://source.unsplash.com/5P91SF0zNsI/740x494", width: 4, height: 3 }
];

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
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {

    this.props.imageGridListRequest('test', 'grid').then(
      () => {
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

    const images = this.props.imageData.map((data) => {
      let obj = {};
      obj.src = data.path;
      obj.width = 4;
      obj.height = 3;
      console.log(obj);
      return obj;
    });
    // const images = [
    //   { src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 4, height: 3 },      
    // ];
    
    return (
      <div>
        <Gallery photos={images} onClick={this.openLightbox} margin={10} direction={"column"} columns={columns} />
        <Lightbox images={photos}
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