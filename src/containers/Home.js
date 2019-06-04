import React, { Component } from 'react';
import {  
  VideoPlayer,
  Gallery,
  Memo,
  ImageGridList
} from './';

class Home extends Component {

  render() {

    return (
      <div style ={{flexGrow: 1}}>        
        <VideoPlayer/>
        <Gallery/>
        <ImageGridList/>
        <Memo/> 
      </div>
      
    );
  }
}

export default Home;
