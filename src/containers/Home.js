import React, { Component } from 'react';
import {  
  Video,
  Gallery,
  Memo,
  GalleryGrid,
} from './';

class Home extends Component {

  render() {

    return (
      <div style ={{flexGrow: 1}}>        
        <Video/>
        <Gallery/>
        <GalleryGrid/>
        <Memo/>
      </div>
    );
  }
}

export default Home;
