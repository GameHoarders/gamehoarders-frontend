import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUS.css';
import Munes from '../AboutUsImg/myPhoto.jpg';
import Emad from '../AboutUsImg/Emad.jpeg';
import Header from './Header';
import Footer from './Footer';
    class AboutUS extends Component {
        render() {
            return (
                <div className="aboutus">
                <div id="container">
                    
                    <div class="cards">
                        <div class="content">
                            <h2>Mohammad Abdul Ghafour</h2>
                            <p>An automatic control and computers engineer / web developer</p>
                            <a href="https://github.com/Mohammad-Abdul-Ghafour" target="_blank"> <i style={{textAlign: "center"}} class="fab fa-github fa-2x"> Github</i></a>
                        </div>
                        <img src="https://avatars.githubusercontent.com/u/87227351?v=4" alt="Mohammad Abdul Ghafour"/>
                    </div>

                    
                    <div class="cards">
                        <div class="content">
                            <h2>Mu'nes Yasin</h2>
                            <p>Software developer with background in civil engineering</p>
                            <a href="https://github.com/MunesYasin" target="_blank"><i style={{textAlign: "center"}} class="fab fa-github fa-2x"> Github</i></a>
                        </div>
                        <img src={`${Munes}`} alt="AhmadAbulaban"/>
                    </div>
                    <div class="cards">
                        <div class="content">
                            <h2>Emad Idris</h2>
                            <p>Computer Science Ain Shams University</p>
                            <a href="https://github.com/EmadIdris" target="_blank"><i style={{textAlign: "center"}} class="fab fa-github fa-2x"> Github</i></a>
                        
                        </div>
                        <img src={`${Emad}`} alt="Ahmad AbuRumuh"/>
                    </div>

            </div >
            </div>
        );
        }
    }

export default AboutUS;
