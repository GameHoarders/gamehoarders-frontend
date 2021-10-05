import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
class CardForHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameProfile: {},
            showModal: false,
            commentData: []
        }
    }

    getCommentHandler = () => {
        let gameId = this.state.gameProfile.id
        let gameUrl = `${process.env.REACT_APP_SERVER}/gcomment?gameId=${gameId}`
        axios.get(gameUrl).then(axiosData => {
            console.log(axiosData.data);
            this.setState({
                commentData: axiosData.data
            })
            console.log(this.state.commentData[0].body);

        })
    }

    getInfo = () => {

        let gameSlug = this.props.home.slug;
        let gameUrl = `${process.env.REACT_APP_SERVER}/home/game?gameName=${gameSlug}`
        axios.get(gameUrl).then(async axiosData => {
            this.setState({
                gameProfile: axiosData.data
            })
            // await this.props.gHandler(axiosData.data)  
            await this.getCommentHandler();
            console.log(this.state.gameProfile);
            this.setState({
                showModal: true
            })

            console.log(this.state.commentData);
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
                        <Card.Img onClick={this.getInfo} variant="top" src={this.props.home.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home.name}</Card.Title>
                            <Card.Text>
                                {this.props.home.rating}
                            </Card.Text>
                        </Card.Body>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home)
                        }}>Add To Wish List</Button>
                        <Button onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>
                {this.state.showModal &&
                    <Modal show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.home.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={this.props.home.image} />
                            <p>{this.props.home.rating}</p>
                            <p>{this.state.gameProfile.description}</p>
                            <p>{this.state.requirements}</p>
                            <p>{this.state.commentData[0].body}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModel}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
                {/* <Modal show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.home.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.home.image} />
                        <p>{this.props.home.rating}</p>
                        <p>{this.state.gameProfile.description}</p>
                        <p>{this.state.requirements}</p>
                        <p>{this.state.commentData[0].body}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModel}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </>
        );
    }
}

export default CardForHome;