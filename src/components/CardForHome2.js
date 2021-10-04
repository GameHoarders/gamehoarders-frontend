import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'

class CardForHome2 extends Component {
    render() {
        return (
            <>
                <CardGroup style={{ width: '13rem' }}>
                    <Card>
                        <Card.Img variant="top" src={this.props.home2.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home2.name}</Card.Title>
                            <Card.Text>
                                {this.props.home2.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home2)
                        }}>Add To Wish List</Button>
                    </Card>
                </CardGroup>
            </>
        );
    }
}

export default CardForHome2;