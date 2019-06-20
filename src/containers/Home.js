import React, { Component } from 'react';
import {  
  Video,
  Gallery,
  Memo,
  ImageGridList,
  Test
} from './';

class Home extends Component {

  render() {
    const video = (<Video data={this.props.match.params} />);

    return (
      <div style ={{flexGrow: 1}}>  
       <Test/>  
       {/* {this.props.match.url !== '/' ? video : undefined}  
        <Gallery/>
        <ImageGridList/>
        <Memo/>  */}
      </div>
      
    );
  }
}

Home.defaultProps = {

  username: '홍길동',
  invitee: '나상욱',
  seq: '1',

}

export default Home;
