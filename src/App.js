import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUS from './components/AboutUs';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import GamePage from './components/Game';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: true,
      showGamePage: false,
      gameDetails:[]
    }
  }
  gameHandler  = (data)=>{
    this.setState({
      gameDetails:data
    })
  }
  
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <div>

      
        <Router>       
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {/* {isAuthenticated ? <MyFavoriteBooks /> : <Login />} */}
              <Home gHandler={this.gameHandler}/>
            </Route>
            <Route exact path="/profile">
            {/* <Profile /> */}
            {isAuthenticated  && <Profile/> }
            {/* </Route>
            <Route exact path="/game">     
            <GamePage/> */}
            </Route>
            <Route exact path="/aboutUs">     
            <AboutUS/>
            </Route>
          </Switch>
          
          <Footer />

          {/* </IsLoadingAndError> */}
        </Router>

        {/* <Header /> */}
        {/* <Home /> */}
        {/* <Footer /> */}

      </div>
    );
  }
}

export default withAuth0(App);
