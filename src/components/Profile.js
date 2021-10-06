import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap'
import UpdateModal from './UpdateModal'
import axios from 'axios';
import './styleForProfile.css';
import { Rating, Typography } from '@mui/material';
import CardGroup from 'react-bootstrap/CardGroup'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      games: [],
      showModal: false,
      gameID: '',
      gameInform: {}
    };
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    let gamesData = await axios.get(`${process.env.REACT_APP_SERVER}/profile?userName=${user.email}`);
    console.log(gamesData);
    this.setState({
      games: gamesData.data,
    });
    console.log(this.state.games);
  }


  deleteBookHandler = (gameID) => {
    const { user } = this.props.auth0;
    console.log(gameID);
    axios.delete(`${process.env.REACT_APP_SERVER}/profile?gameID=${gameID}&userName=${user.email}`).then((gamesData) => {
      this.setState({
        games: gamesData.data
      });
    });
  }

    updateGameHandler = ( gameNote) => {
      let gameInfo = {
        gameNote: gameNote,
        userName: this.props.auth0.user.email,
        gameID: this.state.gameID
      };
    console.log(this.state.gameID);
    axios.put(`${process.env.REACT_APP_SERVER}/profile`, gameInfo).then((gamessData) => {
      this.setState({
        games: gamessData.data
      });
    }
    ).catch(err => console.log(`error in updating the book: ${err}`));
  }


  showModalFun = (gameID,gameInform) => {
    this.setState({
      showModal: !this.state.showModal,
      gameID:gameID,
      gameInform:gameInform
    });
    console.log(gameID);
  }

  
  render() {
    const { user, isAuthenticated } = this.props.auth0;

    return isAuthenticated && (
      <div className="profile">
      <>
      
        <Card style={{backgroundColor:'transparent'}}>
          <div className="cardUser">
          <Card.Img className="imgUser" variant="top" src={user.picture} style={{ width: '13rem' }} />
          <Card.Body>
            <Card.Text className="cardUsertxt">
            <h2>{user.name} </h2>
            <h5>{user.email}</h5> 
            </Card.Text>
          </Card.Body>
          </div>
        </Card>
        {this.state.showModal &&
        <UpdateModal close={this.showModalFun} update={this.updateGameHandler} data={this.state.gameInform} />
          }
          <div className="cardProfile">
            {this.state.games.map((item, index) => {
          console.log(this.state.games);
          return (
            <CardGroup className="cardGame" style={{ width: '20rem' }}>
            <Card >
              <Card.Img style={{ height: '15rem' }} variant="top" src={item.imageURL} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {/* {item.rating} */}
                  <Rating name="read-only" value={item.rating} precision={0.5} readOnly />
                </Card.Text>
                <Card.Text>
                  {item.note}
                </Card.Text>
                <Button variant="primary" className="btnCard1" onClick={ ()=> this.deleteBookHandler(item._id) }>Delete</Button>
                <br/>
                <Button variant="primary" className="btnCard" onClick={()=>this.showModalFun(item._id,item)} >Add Private Note</Button>       
              </Card.Body>
            </Card>
            </CardGroup>
          )
        })}
          </div>
      </>
      </div>
    );
  }
}

export default withAuth0(Profile);