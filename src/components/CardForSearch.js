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
class CardForSearch extends Component {
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
                commentData: axiosData.data,
                showModal: true
            })
            console.log(this.state.commentData[0].body);

        })
    }
    getInfo = async () => {

        let gameSlug = this.props.game.slug;
        let gameUrl = `${process.env.REACT_APP_SERVER}/home/game?gameName=${gameSlug}`
        await axios.get(gameUrl).then(async axiosData => {
            await this.setState({
                gameProfile: axiosData.data,

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
            this.getCommentHandler();
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
                        <Card.Img style={{ height: '15rem' }} variant="top" src={this.props.game.image} />
                        <Card.Body>
                            <Card.Title>{this.props.game.name}</Card.Title>
                            <Card.Text>
                                {/* {this.props.game.rating} */}
                                <Rating name="read-only" value={this.props.game.rating} precision={0.5} readOnly />

                            </Card.Text>
                        </Card.Body>

                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.game)
                        }}>Add To Wish List</Button>
                        <Button className="btnCard" onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>
                <Modal className="special_modal" show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title className="Title" >{this.props.game.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <img src={this.props.game.image}/> */}
                        {/* <p>{this.props.game.rating}</p> */}
                        {/* <Typography component="legend">Rate</Typography> */}
                        {/* <Rating name="read-only" value={this.props.game.rating} readOnly /> */}
                        {/* <p>{this.state.gameProfile.description}</p> */}
                        {/* <p>{this.state.requirements}</p> */}
                        <div className="parentDiv">
                            <div>
                                <img className="gamePostar" src={this.props.game.image} />
                                {/* <p>{this.props.home.rating}</p> */}
                                <div className="rateGame">
                                    {/* <Typography component="legend">Rate</Typography> */}
                                    <Rating name="read-only" value={this.props.game.rating} precision={0.5} size="large" readOnly />
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
                                    <h4>commenter : {this.state.commentData[0].user}</h4>
                                    <p>{this.state.commentData[0].body}</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btnModal" variant="secondary" onClick={this.closeModel}>
                            Close
                        </Button>
                        <Button className="btnModal" variant="secondary" onClick={() => {
                            this.props.addGame(this.props.game)
                        }}>
                            Add To Wish List
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default CardForSearch;
