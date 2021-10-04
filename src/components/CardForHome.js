import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'

class CardForHome extends Component {
    render() {
        return (
            <>
                <CardGroup style={{ width: '13rem' }}>
                    <Card>
                        <Card.Img variant="top" src={this.props.home.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home.name}</Card.Title>
                            <Card.Text>
                                {this.props.home.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home)
                        }}>Add To Wish List</Button>
                    </Card>
                </CardGroup>
            </>
        );
    }
}

export default CardForHome;