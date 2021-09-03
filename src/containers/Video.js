import React, { Component } from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { connect } from 'react-redux';
import {
  videoListRequest,
} from '../actions/video';
const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
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
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
    <div style={{ marginBottom: 100 }}>
      <Typography variant="h5"  style={{ paddingLeft: '1%',paddingBottom: '5%' }}>
        <LibraryBooks /> 모시는 글
      </Typography>

    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography component="h6">
          {this.state.message}
        </Typography>
          {this.state.size > 0 ? videoPlayer : undefined}        
      </CardContent>      
    </Card>        
       
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Video));