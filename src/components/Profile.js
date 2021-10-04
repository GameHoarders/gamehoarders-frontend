import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap'
import UpdateModal from './UpdateModal'
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  // updateGameHandler = (gameName, gameImageURL, gameRating, gameNote) => {
  //   let gameInfo = {
  //     gameName: gameName,
  //     gameImageURL: gameImageURL,
  //     gameRating: gameRating,
  //     gameNote: gameNote,
  //     userName: this.props.auth0.user.email,
  //     gameID: this.state.gameID
  //   };
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

  // showModalFun = () => {
  //   this.setState({
  //     showModal: !this.state.showModal,
  //   });
  // }

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
      <>
        <Card>
          <Card.Img variant="top" src={user.picture} style={{ width: '13rem' }} />
          <Card.Body>
            <Card.Text>
              {user.name}
              <br />
              {user.email}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.state.showModal &&
        <UpdateModal close={this.showModalFun} update={this.updateGameHandler} data={this.state.gameInform} />
          }
        {this.state.games.map((item, index) => {
          console.log(this.state.games);
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.imageURL} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.rating}
                </Card.Text>
                <Card.Text>
                  {item.note}
                </Card.Text>
                <Button variant="primary" onClick={ ()=> this.deleteBookHandler(item._id) }>Delete</Button>
                <Button variant="primary" onClick={()=>this.showModalFun(item._id,item)} >Add Private Note</Button>       
              </Card.Body>
            </Card>
          )
        })}

      </>
    );
  }
}

export default withAuth0(Profile);