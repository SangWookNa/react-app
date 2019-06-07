import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
class Video extends Component {

  render() {

    return (
      <div>
        <VideoPlayer url= 'public/video/react_video-fast.mp4'/>
      </div>
    );
  }
}

export default Video;
