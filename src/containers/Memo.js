import React, { Component } from 'react';
import Write from '../components/Write';
import MemoList from '../components/MemoList';
import ToastBar from '../components/ToastBar';
import { connect } from 'react-redux';
import {
  memoPostRequest
} from '../actions/memo';


class Memo extends Component {
  state = {
    message : '',
    success : false
  }

  handlePost = (username, password, contents) => {
    this.setState({
      message : '축하 메세지가 등록되었습니다~',
      success : !this.state.success
    });

    // this.setState({
    //   success : false
    // });


  }

  render() {
    const write = (<ToastBar message = {this.state.message}/>); 
    
    return (
      <div>
        <Write onPost={this.handlePost} />
        <MemoList />
       {this.state.success === true  ? write : undefined}
      </div>
      
    );
  }
}
const mapStateToProps = (state) => {
  return {
    postStatus: state.memo.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
