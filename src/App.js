import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super (props);
    this.state ={
      showHome : true,
      showGamePage: false
    }
  }
  // homeHandler  = ()=>{
  //   this.set
  // }
  render() {
    return (
      <div>
        <Header/>
        <Home />
        <Footer/>
      </div>
    )
  }
}

export default App;
