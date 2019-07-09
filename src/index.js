import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
        Home,        
        ImageUpload,
        VideoUpload,
        Main,
      } from './containers';


const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
        <div>
          <Route exact path="/" component={Main} /> {/*  로그인 메인 */}
          <Route exact path="/oauth" component={Main} /> {/*  카카오로그인 후 리다이렉션 */}
          <Route exact path="/:enterid/:seq" component={Home} /> {/*  청첩장 메인 (공통) */}
          <Route exact path="/:enterid/:invitee/:seq" component={Home} /> {/*  청첩장 메인 (초대자 명시) */}
          <Route path="/VideoUpload" component={VideoUpload} /> {/* 동영상 업로드 */}
          <Route path="/ImageUpload" component={ImageUpload} /> {/* 이미지 업로드 */}
        </div>
      </Router>
    </Provider>
    , document.getElementById('root')
    );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
