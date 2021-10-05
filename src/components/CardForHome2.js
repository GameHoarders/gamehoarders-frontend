import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import axios from 'axios';
import { Rating , Typography } from '@mui/material';
import './styleForModal.css';
import Modal from 'react-bootstrap/Modal'
class CardForHome2 extends Component {
    constructor(props){
        super(props);
        this.state={
            gameProfile:{},
            showModal:false,
            requirements:''
            
        }
    }
    

    getInfo=()=>{

    let gameSlug = this.props.home2.slug;
    let gameUrl = `${process.env.REACT_APP_SERVER}/home/game?gameName=${gameSlug}`
    axios.get(gameUrl).then(axiosData =>{
        this.setState({
            gameProfile:axiosData.data,
            showModal : true
        })
        if(axiosData.data.requirements.minimum){
            this.setState({
                requirements:axiosData.data.requirements.minimum
            })
        }else if (axiosData.data.requirements.recommended){
            this.setState({
                requirements:axiosData.data.requirements.recommended
            })
        }else {
            this.setState({
                requirements:'this game has no requirement'
            })
        }
        console.log(this.state.gameProfile);
        this.props.gHandler(axiosData.data)     
    })
    
    }
    
    closeModel = ()=>{
        this.setState({
            showModal:false
        })
    }
    render() {
        return (
            <>
                <CardGroup className="cardGame"  style={{ width: '20rem' }}>
                    <Card>
                    <Card.Img style={{ height: '15rem'  }} variant="top" src={this.props.home2.image} />
                        <Card.Body>
                            <Card.Title>{this.props.home2.name}</Card.Title>
                            <Card.Text>
                                {/* {this.props.home2.rating} */}
                                <Rating name="read-only" value={this.props.home2.rating}  precision={0.5}  readOnly />
                            </Card.Text>
                        </Card.Body>
                        <Button variant="primary" onClick={() => {
                            this.props.addGame(this.props.home2)
                        }}>Add To Wish List</Button>
                        <Button className="btnCard" onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>

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
                        <Rating name="read-only" value={this.props.home2.rating}  precision={0.5} size="large" readOnly />
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
                        </div>
                        </div>
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
            </>
        );
    }
}

export default CardForHome2;