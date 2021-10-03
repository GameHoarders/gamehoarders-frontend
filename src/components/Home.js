import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styleForHome.css';
import axios from 'axios';
import CardForSearch from './CardForSearch'
class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            game:[],
            gameName:'',
            showGame:false,
            showError:false
        }
    }
    search = async (event)=>
    {
        event.preventDefault();
        await this.setState({
            gameName:event.target.searchForGame.value
        });
        try{
            let urlSite = `${process.env.REACT_APP_SERVER}/home/search?gameName=${this.state.gameName}`;
            let result = await axios.get(urlSite)
            this.setState({
                game:result.data,
                showGame:true,
                showError:false
            })
        }catch{
            this.setState({
                showGame:false,
                showError:true
            })
        }
    }

    render() {
        return (
            <div>
                <>
                    <Form onSubmit={this.search}>
                        <Form.Group className="mb-3">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="text" name="searchForGame" placeholder="Search for Games" />
                            <Form.Text className="text-muted">
                                You Can Write any Game Name
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </>
                {/* https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&ordering=-rating */}
                <>

                {this.state.game.map((item,index)=>{
                    return <CardForSearch  key={index} game={item} />
                })}
                </>
            </div>
        )
    }
}

export default Home;

