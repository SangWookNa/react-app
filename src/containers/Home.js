import React, { Component } from 'react';
import {  
  Video,
  Gallery,
  Memo,
  ImageGridList
  //GalleryGrid,
} from './';

class Home extends Component {

  render() {

    return (
      <div style ={{flexGrow: 1}}>        
        <Video/>
        <Gallery/>
        <ImageGridList/>
        {/* <GalleryGrid/> */}
        <Memo/> 
      </div>
      
    );
  }
}

export default Home;
