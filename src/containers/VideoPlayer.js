import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { withStyles } from '@material-ui/core/styles';
 
const styles = {
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */
        top: 10,
        left: 0,
        backgroundColor: ''
      },
    reactPlayer : {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: ''
      },
};

class VideoPlayer extends Component {
    
  render () {
    const { classes } = this.props;
      return(
        <div className = {classes.playerWrapper}>
            <ReactPlayer 
            className = {classes.reactPlayer}
            url='public/video/react_video-fast.mp4' 
            playing
            width='100%'
            height='90%' />
        </div>
      )
    
  }
}

export default withStyles(styles)(VideoPlayer);