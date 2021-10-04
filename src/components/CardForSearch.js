import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup'
// import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
class CardForSearch extends Component {
    constructor(props){
        super(props);
    this.state={
            gameProfile:{},
            showModal:false,
            requirements:''
    }
}
    getInfo=()=>{

    let gameSlug = this.props.game.slug;
    let gameUrl = `${process.env.REACT_APP_SERVER}/home/game?gameName=${gameSlug}`
    axios.get(gameUrl).then(axiosData =>{
        console.log(gameUrl);
        console.log(axiosData.data);
        this.setState({
            gameProfile:axiosData.data,
            showModal : true
        })

        console.log(axiosData.data.requirements.minimum);
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
                <CardGroup style={{ width: '13rem' }}>
                    <Card style={{ width: '13rem' }}>
                    <Card.Img variant="top" src={this.props.game.image} />
                        <Card.Body>
                            <Card.Title>{this.props.game.name}</Card.Title>
                            <Card.Text>
                                {this.props.game.rating}
                            </Card.Text>
                        </Card.Body>

                        <Button variant="primary" onClick={()=>{
                            this.props.addGame(this.props.game)
                        }}>Add To Wish List</Button>
                        <Button onClick={this.getInfo} >More Info</Button>
                    </Card>
                </CardGroup>
                <Modal show={this.state.showModal} fullscreen={true} onHide={this.closeModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.game.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.game.image}/>
                        <p>{this.props.game.rating}</p>
                        <p>{this.state.gameProfile.description}</p>
                        <p>{this.state.requirements}</p>
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
export default CardForSearch;
