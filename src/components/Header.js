import React, { Component } from 'react';
import logo from './logo/GameHoarders21.png'
import './styleForHeader.css';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        const { isAuthenticated } = this.props.auth0;
        return (
            <div>

                <>
                    <header>
                        <img className="logoImg" src={logo} />
                        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        <div class="navigation">
                            <div class="navigation-items">
                                <Link to="/">Home</Link>
                                {isAuthenticated && 
                                <>
                                <Link to="/profile">Profile</Link>
                                </>
                                }
                                
                                <Link to="/aboutUs">AboutUs</Link>
                            </div>
                        </div>
                    </header>
                </>
                

            </div>
        );
    }
}

export default withAuth0(Header);
