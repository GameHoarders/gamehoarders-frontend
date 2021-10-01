import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Home/>
        <Footer/>
      </div>
    )
  }
}

export default App;
