import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form'


import axios from 'axios';
import { Rating, Typography } from '@mui/material';
import './styleForModal.css';
import Modal from 'react-bootstrap/Modal'
class CardForHome2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameProfile: {},
            showModal: false,
            requirements: '',
            commentData: []

        }
    }
    // getCommentHandler = () => {
    //     let gameId = this.state.gameProfile.id
    //     let gameUrl = `${process.env.REACT_APP_SERVER}/gcomment?gameId=${gameId}`
    //     axios.get(gameUrl).then(axiosData => {
    //         console.log(axiosData.data);
    //         this.setState({
    //             commentData: axiosData.data,
    //             showModal: true
    //         })
    //         console.log(this.state.commentData[0].body);

    //     })
    // }
    getCommentHandler = () => {
        let gameId = this.state.gameProfile.id
        let gameUrl = `${process.env.REACT_APP_SERVER}/gcomment?gameId=${gameId}`
        axios.get(gameUrl).then(axiosData => {
            console.log(axiosData.data);
            if (axiosData.data.length === 0) {

                this.setState({
                    commentData: [{ user: 'No Comments', body: 'No Comments' }],
                    showModal: true,
                })
            } else {

                this.setState({
                    commentData: axiosData.data,
                    showModal: true,
                    showCom:true
                })
            }
            console.log(this.state.commentData[0].body);
        })
    }
    getInfo = async () => {

        let gameSlug = this.props.home2.slug;
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
    commentHandler =(event)=>{
        event.preventDefault();
        const { user} = this.props.auth0;
        let comment = event.target.comment.value;
        let parameter = {
            gameId:this.state.gameProfile.id,
            body:comment ,
            user:user.name,
            email:user.email
        }
        
        let commentURL = `${process.env.REACT_APP_SERVER}/gcomment`
        axios.post(commentURL,parameter).then(Data=>{
            this.setState({
                commentData:Data.data,
                showCom:false
            })
            this.getCommentHandler();
        })
    }
    deleteCommentHandler = (CId,ID) =>{

        let url=`${process.env.REACT_APP_SERVER}/gcomment?gameId=${ID}&commentId=${CId}`
        axios.delete(url).then(Data=>{
            this.setState({
                commentData:Data.data,
                showCom:false
            })
            this.getCommentHandler();
        })
    }
    UpdateCommentHandler = (event, CId, ID) => {
        // commentId, body, gameId
        event.preventDefault();
        let Body = event.target.commentU.value
        let Info = {
            commentId: CId, body: Body, gameId: ID
        }

        axios.put(`${process.env.REACT_APP_SERVER}/gcomment`, Info).then(async Data => {
            this.setState({
                commentData: Data.data,
                showCom: false,


            })
            await this.getCommentHandler();
            this.setState({
                showU: false
            })
        })
    }
    showU =()=>{
        this.setState({
            showU:true
        })
    }
    render() {
        const {  user,isAuthenticated } = this.props.auth0;
        return (
            <>
                <CardGroup className="cardGame" style={{ width: '20rem' }}>
                    <Card>
                        <Card.Img style={{ height: '15rem' }} variant="top" src={this.props.home2.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home2.name}</Card.Title>
                            <Card.Text>
                                {/* {this.props.home2.rating} */}
                                <Rating name="read-only" value={this.props.home2.rating} precision={0.5} readOnly />
                            </Card.Text>
                        </Card.Body>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home2)
                        }}>Add To Wish List</Button>
                        <Button className="btnCard" onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>
                {this.state.showModal &&
                <Modal className="special_modal" show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title className="Title" >{this.props.home2.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="parentDiv">
                            <div>
                                <img className="gamePostar" src={this.props.home2.image} />
                                {/* <p>{this.props.home.rating}</p> */}
                                <div className="rateGame">
                                    {/* <Typography component="legend">Rate</Typography> */}
                                    <Rating name="read-only" value={this.props.home2.rating} precision={0.5} size="large" readOnly />
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
                                        {this.state.showCom && 
                                        this.state.commentData.map((item, index) => {
                                            return (<> <h4 key={index}>Name: {item.user}</h4>
                                        <p>{item.body}</p>
                                        {isAuthenticated && user.name === item.user && this.state.showU &&
                                                        <Form onSubmit={(event) => this.UpdateCommentHandler(event,item._id,  this.state.gameProfile.id)}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                <Form.Label>Write a comment</Form.Label>
                                                                <Form.Control name="commentU" as="textarea" defaultValue={item.body} />
                                                            </Form.Group>
                                                            <Button variant="primary" type="submit">
                                                                GO
                                                            </Button>
                                                        </Form>

                                                    }
                                        {isAuthenticated && user.name === item.user && 
                                        <>
                                                    <Button className="btnCard X" style={{width:'15%'}} onClick={()=>this.deleteCommentHandler(item._id ,this.state.gameProfile.id  )} >DELETE</Button>
                                                    <Button className="btnCard X" style={{ width: '15%' }} onClick={this.showU} >UPDATE</Button>
                                          </>          
                                                    }
                                        </>
                                            )
                                        })
                                        }
                                    </div>
                            </div>
                            </div>
                            {isAuthenticated &&
                                    <div>
                                        <Form onSubmit={this.commentHandler}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Write a comment</Form.Label>
                                                <Form.Control name="comment"  as="textarea" rows={3} />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Post
                                            </Button>
                                        </Form>
                                    </div>
                                }
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btnModal" variant="secondary" onClick={this.closeModel}>
                            Close
                        </Button>
                        <Button className="btnModal" variant="secondary" onClick={() => {
                            this.props.addGame(this.props.home2)
                        }}>
                            Add To Wish List
                        </Button>
                    </Modal.Footer>
                </Modal>
                    }
            </>
        );
    }
}

export default withAuth0(CardForHome2);