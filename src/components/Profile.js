import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    // const user = this.props.auth0.user;
    // const isAuthenticated = this.props.auth0.isAuthenticated;

    return isAuthenticated && (
      <>
        {/* 
        <img src={user.picture} />
        <div>Hello: {user.name}</div>
        <div> {user.email}</div> */}


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

        {/* {this.state.game.map((item, index) => {
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
        })} */}

      </>
    );
  }
}

export default withAuth0(Profile);