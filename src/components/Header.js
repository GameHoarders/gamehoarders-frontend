import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
// import Button from 'react-bootstrap/Button'
import logo from './logo/GameHoarders21.png'
import img1 from './image/1.jpg'
import img2 from './image/2.jpg'
import img3 from './image/3.jpg'
import img4 from './image/4.jpg'
import img5 from './image/5.jpg'
import img6 from './image/6.jpg'
import img7 from './image/7.jpg'
import img8 from './image/8.jpg'
import img9 from './image/9.jpg'
import img10 from './image/10.jpg'
import img11 from './image/11.jpg'
import './styleForHeader.css';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { Link } from "react-router-dom";
// import Button from '@restart/ui/esm/Button';

class Header extends Component {

    render() {
        const { isAuthenticated } = this.props.auth0;
        return (
            <div>
                <>
                    {/* <Button */}
                    
                    {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
                    <header>
                    {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
                        <img className="logoImg" src={logo} />
                        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        <div class="navigation">
                            <div class="navigation-items">
                                {/* <a href="#">Home</a> */}
                                <Link to="/">Home</Link>
                                {/* <a onClick={this.props.showprofileProps}>Profile</a> */}
                                {/* <button onClick={this.props.showprofileProps}>Profile</button> */}
                                <Link to="/profile">Profile</Link>
                                {/* <a href="#">About Us</a> */}
                                <Link to="/aboutUs">AboutUs</Link>

                                {/* <Button variant="primary">Log In</Button> */}
                            </div>
                        </div>
                    </header>
                </>
                <>
                    <Carousel fade className="headerImg">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img1}?text=First slide&bg=373940`} />
                            <Carousel.Caption>
                                <h3>Call Of Duty</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img2}?text=Second slide&bg=282c34`}
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Call Of Duty : Black Ops</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img3}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>FORZA</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img4}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>Cyberpunk 2077</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img5}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>Need For Speed</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img6}?text=Third slide&bg=20232a`}
                            // alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Need For Speed</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img7}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>Assassin's Creed Valhalla</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img8}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>The Witcher</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img9}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>Cyberpunk 2077</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img10}?text=Third slide&bg=20232a`}
                            />

                            <Carousel.Caption>
                                <h3>The Last Of Us</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${img11}?text=Third slide&bg=20232a`}
                            />
                            <Carousel.Caption>
                                <h3>God Of War</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                </>
                {/* <br/><br/>
                <br/>
                <br/> */}
    {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
            </div>
        )
    }
}

export default withAuth0(Header);
