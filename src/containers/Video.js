import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
  videoListRequest,
} from '../actions/video';

class Video extends Component {
  state = {
    path: '',
    size: 0,
    message : ''
  }

  componentDidMount() {

    let enterid = this.props.data.enterid;
    let invitee = this.props.data.invitee;
    let seq = this.props.data.seq;

    let origin = window.location.origin;
    this.props.videoListRequest(enterid, invitee, seq).then(
      () => {
        this.setState({
          path: `${origin}/${this.props.videoData[0].path}`,
          size: this.props.videoData[0].size,
          message : this.props.videoData[0].message
        })
      }
    );


  }

  render() {
    const videoPlayer = (<VideoPlayer url={this.state.path} />);
    return (
      <div style={{marginBottom: 50 }}>
        <Typography variant="h6" component="h3" align="center">
            {this.state.message}
        </Typography>
        {this.state.size > 0 ? videoPlayer : undefined}
        
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