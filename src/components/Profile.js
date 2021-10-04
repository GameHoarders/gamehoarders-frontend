import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      showModal: false,
      showUpdate: false,
      gameID: '',
      gameInform: {}
    };
  }

  componentDidMount = async () => {
    let gamesData = await axios.get(`${process.env.REACT_APP_SERVER}/profile?userName=${this.props.auth0.user.email}`);
    console.log(gamesData);
    this.setState({
      games: gamesData.data,
    });
  }

  deleteBookHandler = (gameID) => {
    console.log(gameID);
    axios.delete(`${process.env.REACT_APP_SERVER}/profile?gameID=${gameID}&userName=${this.props.auth0.user.email}`).then((gamesData) => {
      this.setState({
        games: gamesData.data
      });
    });
  }

  updateBookHandler = (gameName, gameImageURL, gameRating, gameNote) => {
    let gameInfo = {
      gameName: gameName,
      gameImageURL: gameImageURL,
      gameRating: gameRating,
      gameNote: gameNote,
      userName: this.props.auth0.user.email,
      gameID: this.state.gameID
    };
    axios.put(`${process.env.REACT_APP_SERVER}/profile`, gameInfo).then((gamessData) => {
      this.setState({
        games: gamessData.data
      });
    }
    ).catch(err => console.log(`error in updating the book: ${err}`));
  }

  showUpdateModalHandler = (gameID,gameInform) => {
    this.setState({
      showUpdate: !this.state.showUpdate,
      gameID:gameID,
      gameInform:gameInform
    });
  }
  render() {
    const { user, isAuthenticated } = this.props.auth0;

    return isAuthenticated && (
      <>
        <Card>
          <Card.Img variant="top" src={user.picture} style={{ width: '13rem' }} />
          <Card.Body>
            <Card.Text>
              Hello {user.name}
              <br />
              {user.email}
            </Card.Text>
          </Card.Body>
        </Card>

        {this.state.game.map((item, index) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          )
        })}

      </>
    );
  }
}

export default withAuth0(Profile);