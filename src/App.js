import React, { Component } from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
        Home,        
        ImageUpload,
        VideoUpload,
        Main,
      } from './containers';


class App extends Component {

  componentDidMount() {
    
    //카카오 로그인 리다이렉트
   console.log(this.props);

  }

  render() {
    return (   
      <Router>
        <div>
          <Route exact path="/" component={Main} /> {/*  로그인 메인 */}
          <Route exact path="/oauth" component={Main} /> {/*  카카오로그인 후 리다이렉션 */}
          <Route exact path="/:username/:seq" component={Home} /> {/*  청첩장 메인 (공통) */}
          <Route exact path="/:username/:invitee/:seq" component={Home} /> {/*  청첩장 메인 (초대자 명시) */}
          <Route path="/VideoUpload" component={VideoUpload} /> {/* 동영상 업로드 */}
          <Route path="/ImageUpload" component={ImageUpload} /> {/* 이미지 업로드 */}
        </div>
      </Router>
    );
  }
}

export default App;
