import React, { Component } from 'react';
import Write from '../components/memo/Write';
import { MemoList } from '../components/memo';
import { ToastBar } from '../components/common';
import { connect } from 'react-redux';
import {
  memoPostRequest,
  memoListRequest,
  memoRemoveRequest,
  passwordCheckRequest,
  memoEditRequest
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

  handleCheck = (password, _id, selectedValue) => {
    this.setState({
      message: '',
      success: false
    });

    return this.props.passwordCheckRequest(_id, password).then(
      () => {

        if (this.props.checkStatus.status === "SUCCESS") {
          if (selectedValue === "edit") {
            return this.props.checkStatus.status;
          } else if (selectedValue === "delete") {
            this.handleRemove(_id, '');
          }

        } else {
          //ERROR
          let errorMessage = [
            'INVALID ID',
            '비밀번호를 입력해주세요!',
            'USER FIND FAILED',
            '비밀번호가 틀렸습니다'
          ];
          this.setState({
            message: errorMessage[this.props.checkStatus.error - 1],
            success: true
          });
        }
      }
    );
  }

  handleEdit = (id, contents, index) => {
    this.setState({
      message: '',
      success: false
    });

    return this.props.memoEditRequest(id, contents, index).then(
      () => {
        if (this.props.editStatus.status === 'SUCCESS') {
          this.setState({
            message: '글 수정이 완료되었습니다.',
            success: true
          });

          return this.props.editStatus.status;
        } else {
          /*
                 ERROR CODES
                     1: INVALID ID,
                     2: EMPTY CONTENTS
                     3: NO RESOURCE
          */
            let errorMessage = [
              'Something broke',
              '글을 입력해주세요~',
              '메모가 존재하지않습니다.',              
            ];

          this.setState({
            message: errorMessage[this.props.editStatus.error - 1],
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
          onCheck={this.handleCheck}
          onEdit={this.handleEdit}
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
    checkStatus: state.memo.check,
    editStatus: state.memo.edit
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
    passwordCheckRequest: (id, password) => {
      return dispatch(passwordCheckRequest(id, password));
    },
    memoEditRequest: (id, contents, index) => {
      return dispatch(memoEditRequest(id, contents, index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
