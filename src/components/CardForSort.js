import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'

class CardForSort extends Component {
    render() {
        return (
            <>
                <CardGroup style={{ width: '13rem' }}>
                    <Card>
                        <Card.Img variant="top" src={this.props.sort.image} />
                        <Card.Body>
                            <Card.Title>{this.props.sort.name}</Card.Title>
                            <Card.Text>
                                {this.props.sort.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.sort)
                        }}>Add To Wish List</Button>
                    </Card>
                </CardGroup>
            </>
        );
    }
}

export default CardForSort;