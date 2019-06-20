import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import { connect } from 'react-redux';
import {
  videoListRequest,
} from '../actions/video';

class Video extends Component {
  state = {
    path: '',
  }

  componentDidMount() {

    let username = this.props.data.username;
    let invitee = this.props.data.invitee;
    let seq = this.props.data.seq;

    let origin   = window.location.origin;
    this.props.videoListRequest(username, invitee, seq).then(
      () => {       

        this.setState({
          path : `${origin}/${this.props.videoData[0].path}`
        })
      }
    );


  }

  render() {

    return (
      <div>
        <VideoPlayer url= {this.state.path}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videoData: state.video.videoList.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    videoListRequest: (username, invitee, seq) => {
      return dispatch(videoListRequest(username, invitee, seq))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);