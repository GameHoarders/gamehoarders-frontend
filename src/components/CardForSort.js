import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
class CardForSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameProfile: {},
            showModal: false,
            commentData: {}

        }
    }

    getCommentHandler = () => {
        let gameId = this.props.sort.id
        let gameUrl = `${process.env.REACT_APP_SERVER}/gcomment?gameId=${gameId}`
        axios.get(gameUrl).then(axiosData => {
            this.setState({
                commentData: axiosData.data
            })
        })
    }


    getInfo = () => {

        let gameSlug = this.props.sort.slug;
        let gameUrl = `${process.env.REACT_APP_SERVER}/home/game?gameName=${gameSlug}`
        axios.get(gameUrl).then(axiosData => {

            this.setState({
                gameProfile: axiosData.data,
                showModal: true
            })
            if (axiosData.data.requirements.minimum) {
                this.setState({
                    requirements: axiosData.data.requirements.minimum
                })
            } else if (axiosData.data.requirements.recommended) {
                this.setState({
                    requirements: axiosData.data.requirements.recommended
                })
            } else {
                this.setState({
                    requirements: 'this game has no requirement'
                })
            }
            console.log(this.state.gameProfile);
            this.props.gHandler(axiosData.data)
        })

    }

    closeModel = () => {
        this.setState({
            showModal: false
        })
    }

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

                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.sort)
                        }}>Add To Wish List</Button>
                        <Button onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>
                <Modal show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.sort.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.sort.image} />
                        <p>{this.props.sort.rating}</p>
                        <p>{this.state.gameProfile.description}</p>
                        <p>{this.state.gameProfile.requirements}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModel}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CardForSort;