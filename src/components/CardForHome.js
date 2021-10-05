import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import { Rating, Typography } from '@mui/material';
// import Rating from '@mui/material/Rating';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import './styleForModal.css';
class CardForHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameProfile: {},
            showModal: false,
            requirements: '',
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
        axios.get(gameUrl).then( async axiosData => {
            this.setState({
                gameProfile: axiosData.data,
                showModal: true
            })
            // await this.getCommentHandler();
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
            // this.setState({
            //     showModal: true
            // })
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

                <CardGroup className="cardGame" style={{ width: '20rem' }}>
                    <Card >
                        <Card.Img style={{ height: '15rem' }} onClick={this.getInfo} variant="top" src={this.props.home.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home.name}</Card.Title>
                            <Card.Text>
                                {/* {this.props.home.rating} */}
                                <Rating name="read-only" value={this.props.home.rating} precision={0.5} readOnly />
                            </Card.Text>
                        </Card.Body>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home)
                        }} className="button sweepButton" ><span class="gradient"></span> Add To Wish List</Button>

                        <Button className="btnCard" onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>

                <Modal show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.home.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="parentDiv">
                            <div>
                                <img className="gamePostar" src={this.props.home.image} />
                                {/* <p>{this.props.home.rating}</p> */}
                                <div className="rateGame">
                                    {/* <Typography component="legend">Rate</Typography> */}
                                    <Rating name="read-only" value={this.props.home.rating} precision={0.5} size="large" readOnly />
                                </div>
                            </div>
                            <div className="paragraphGame">
                                <div className="storyGame">
                                    <h2>Story</h2>
                                    <p >{this.state.gameProfile.description}</p>
                                </div>
                                <div className="requirementGame">
                                    <h2>Requirement</h2>
                                    <p>{this.state.requirements}</p>
                                </div>
                                <div className="CommentGame">
                                    <h2>Comments</h2>
                                    <p>{this.state.commentData[0].body}</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModel}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            this.props.addGame(this.props.home)
                        }}>
                            Add To Wish List
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CardForHome;