import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styleForHome.css';
import axios from 'axios';
import CardForSearch from './CardForSearch'
import CardForSort from './CardForSort'
import Profile from './Profile'
import CardForHome from './CardForHome'
import CardForHome2 from './CardForHome2'
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal'
import './styleForModal.css';
// import { withAuth0 } from '@auth0/auth0-react';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [],
            gameTR: [],
            gameNG: [],
            // games:[],
            sort: '',
            gameName: '',
            showGame: false,
            showError: false,
            showProfile: false
        }
    }
    componentDidMount = async () => {

        let gamesDataTR = await axios.get(`${process.env.REACT_APP_SERVER}/home/toprating`);
        let gamesDataNG = await axios.get(`${process.env.REACT_APP_SERVER}/home/newgames`);

        // console.log(gamesData);
        // let gameData = gamesDataTR.concat(gamesDataNG)

        console.log(gamesDataTR);
        console.log(gamesDataNG);

        this.setState({
            gameTR: gamesDataTR.data,
            gameNG: gamesDataNG.data
        });
    }
    search = async (event) => {
        event.preventDefault();
        await this.setState({
            gameName: event.target.searchForGame.value
        });
        try {
            let urlSite = `${process.env.REACT_APP_SERVER}/home/search?gameName=${this.state.gameName}`;
            let result = await axios.get(urlSite)
            this.setState({
                game: result.data,
                showGame: true,
                showError: false
            })
        } catch {
            this.setState({
                showGame: false,
                showError: true
            })
        }
    }
    profile = () => { this.setState({ showProfile: true }); }

    sortHandler = async (event) => {
        event.preventDefault();
        await this.setState({
            sort: event.target.value
        })
        let urlSite = `${process.env.REACT_APP_SERVER}/home/${this.state.sort}`;
        axios.get(urlSite).then(sortData => {
            let newDataSort = sortData.data;
            this.setState({
                game: newDataSort
            })
        })
    }

    addGame = (gameData) => {
        const { isAuthenticated, user } = this.props.auth0;
        console.log(gameData);

        if (isAuthenticated) {
            let gameInfo = {
                gameName: gameData.name,
                gameImageURL: gameData.image,
                gameRating: gameData.rating,
                gameNote: '',
                userName: user.email,
                showAlert: false
            };

            axios.post(`${process.env.REACT_APP_SERVER}/profile`, gameInfo)

        }
        else {
            // let msg = alert('Please Log In before Add ');
            this.setState({
                showAlert: true
            })
        }

        // {isAuthenticated ? return axiosMsg : return msg;}

    }

    render() {
        return (
            <div className="homePage">
                <Modal className="special_modal" show={this.state.showAlert} onHide={() => this.setState({ showAlert: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please Log In To Add The Game To Your Wish List</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ showAlert: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* {this.props.a &&
                            <>
                                <Alert variant='danger'>
                                    Please Login
                                </Alert>
                            </>
                        } */}

                <>
                    <Form onSubmit={this.search}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="searchForGame" placeholder="Search for Games" />
                        </Form.Group>
                        <Button variant="primary" type="submit" id="search" >
                            Search
                        </Button>
                    </Form>
                </>
                {/* https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&ordering=-rating */}
                <>
                    {this.state.showProfile &&
                        <Profile showprofileProps={this.profile} />
                    }
                    <div className="formSort">
                        <Form.Select name="sortGame" aria-label="Default select example" onChange={this.sortHandler}>
                            <option value="chose">Sort</option>
                            <option value="newgames">NEW Games</option>
                            <option value="toprating">Top Rating Games</option>
                            <option value="pc">PC Games</option>
                            <option value="ps">PS Games</option>
                            <option value="xbox">XBOX Games</option>
                        </Form.Select>
                    </div>


                    <div className="cardstyle">
                        {this.state.game.map((item, index) => {
                            return <CardForSearch a={this.state.showAlert} addGame={this.addGame} key={index} game={item} gHandler={this.props.gHandler} />
                        })}
                    </div>

                    <div className="cardstyle">
                        {this.state.game.map((item, index) => {
                            return <CardForSort addGame={this.addGame} key={index} sort={item} gHandler={this.props.gHandler} />
                        })}
                    </div>

                    <div className="cardstyle">
                    {
                        this.state.gameTR.map((item, index) => {
                            <h2>Top</h2>
                        return <CardForHome a={this.state.showAlert} addGame={this.addGame} key={index} home={item} gHandler={this.props.gHandler} />          
                    })}
                    </div>
                    <div className="cardstyle">
                        {this.state.gameNG.map((item, index) => {
                            return <CardForHome2 addGame={this.addGame} key={index} home2={item} gHandler={this.props.gHandler} />
                        })}
                    </div>
                </>
            </div >
        )
    }
}

export default withAuth0(Home);