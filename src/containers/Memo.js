import React, { Component } from 'react';
import Write from '../components/Write';
import MemoList from '../components/MemoList';
import ToastBar from '../components/ToastBar';
import { connect } from 'react-redux';
import {
  memoPostRequest,
  memoListRequest,
  memoRemoveRequest
} from '../actions/memo';


class Memo extends Component {
  state = {
    message: '',
    success: false,
    initiallyLoaded: false
  }

  componentDidMount() {

    this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
      () => {

        this.setState({
          initiallyLoaded: true
        })
      }
    );


  }

  handlePost = (username, password, contents) => {
    this.setState({
      message: '',
      success: false
    });

    return this.props.memoPostRequest(username, password, contents).then(
      () => {
        if (this.props.postStatus.status === "SUCCESS") {

          //TRIGGER LOAD memoListRequest
          this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
            () => {
              this.setState({
                message: '축하 메세지가 등록되었습니다~',
                success: true
              });
            }
          );

          return this.props.postStatus;
        } else {
          /*
              ERROR CODES
              1: NOT LOGGED IN
              2: EMPTY CONTENTS
           */
          switch (this.props.postStatus.error) {
            case 1:
              // 1: BAD USERNAME
              this.setState({
                message: '이름을 다시 입력해주세요!',
                success: true
              });
              break;
            case 2:
              // 2: EMPTY CONTENTS
              this.setState({
                message: '메세지를 입력해주세요!',
                success: true
              });
              break;
            default:
              // 3: BAD PASSWORD
              this.setState({
                message: '비밀번호를 다시 입력해주세요!',
                success: true
              });
              break;

          }
          return this.props.postStatus;
        }
      }
    )
  }

  handleRemove = (id, index) => {
    this.setState({
      message: '',
      success: false
    });

    this.props.memoRemoveRequest(id, index).then(() => {
        if (this.props.removeStatus.status === "SUCCESS") {
          //TRIGGER LOAD memoListRequest
          this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
            () => {
              this.setState({
                message: '메세지가 삭제되었습니다.',
                success: true
              });
            }
          );
        } else {
            //ERROR
            let errorMessage = [
                'Something broke',
                'You are not logged in',
                'That memo does not exist',
                'You do not have permission'
            ];

            this.setState({
              message: errorMessage[this.props.removeStatus.error - 1],
              success: true
            });            
        }
    });
}

  render() {
    const write = (<ToastBar message={this.state.message} />);

    return (
      <div>
        <Write onPost={this.handlePost} />
        <MemoList data={this.props.memoData}
          onRemove={this.handleRemove}
        />
        {this.state.success === true ? write : undefined}
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    postStatus: state.memo.post,
    memoData: state.memo.list.data,
    removeStatus: state.memo.remove,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username))
    },
    memoPostRequest: (username, password, contents) => {
      return dispatch(memoPostRequest(username, password, contents));
    },
    memoRemoveRequest: (id, index) => {
      return dispatch(memoRemoveRequest(id, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
