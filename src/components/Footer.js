import React, { Component } from 'react';
import Logo from '../AboutUsImg/logo.png'
import './Footer.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faFacebookF , faLinkedin , faTwitter } from '@fortawesome/free-brands-svg-icons';
class Footer extends Component {
    render() {
        return (
            <div id='background'>
                <img src={`${Logo}`} alt="logo" id='logoImg' />
                <p class="text">
                    © Copyright 2021 Game Hoarders .<br />
                    All rights reserved.
                </p>
            </div>
        );
    }
}

export default Footer;
