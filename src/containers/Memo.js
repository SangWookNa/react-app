import React, { Component } from 'react';
import Write from '../components/Write';
import MemoList from '../components/MemoList';


class Memo extends Component {

  render() {

    return (
      <div>
        <Write />
        <MemoList />
      </div>
    );
  }
}

export default Memo;
