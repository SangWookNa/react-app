import React, { Component } from 'react';
// Router
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './containers/Header';
import Home from './containers/Home';
import Video from './containers/Video';
import Gallery from './containers/Gallery';
import Memo from './containers/Memo';
import GalleryGrid from './containers/GalleryGrid';

class App extends Component {

  render() {
    return (
      <div style ={{flexGrow: 1}}>
        <Header />
        <Home />
        <Video />
        {/* <Gallery />        
        <GalleryGrid /> */}
        <Memo />
        
      </div>
      // <Router>
      //   <div>
      //     <Header />
      //     <Route exact path="/" component={Home} />
      //     <Route path="/home" component={Home} />
      //     <Route path="/video" component={Video} />
      //     <Route path="/gallery" component={Gallery} />
      //     <Route path="/memo" component={Memo} />
         
      //   </div>
      // </Router>
    );
  }
}

export default App;
