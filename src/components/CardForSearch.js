import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
class CardForSearch extends Component {
    render() {
        return (
            <>
                <CardGroup>
                        <Card>
                            <Card.Img variant="top" src={this.props.game.image} />
                            <Card.Body>
                                <Card.Title>{this.props.game.name}</Card.Title>
                                <Card.Text>
                                    {this.props.game.rating}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
            </>
        );
    }
}
export default CardForSearch;