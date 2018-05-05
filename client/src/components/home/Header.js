import { Carousel } from 'react-bootstrap';
import React, { Component } from "react";
import Typed from 'react-typed';

export class Header extends Component {
    state = {
        indicators: false,
        controls: false,
        interval: 5000
    }

    render() {
        return (
            <div>
                <div className="video-container">
                  <div className="v-header">
                    <video src="../assets/video-bkgd.mp4" autoPlay="true" loop="true"></video>
                  </div>
                  <div className="video-overlay"></div>
                  <div className="video-text">
                  <h1><Typed style={{fontFamily: "Architects Daughter, cursive", fontSize: "48px"}}
                    strings={['Volunteer.', 'Rally.', 'March.', 'Protest.', 'Gather4Good.']} 
                    typeSpeed={170}
                /></h1> 
                  </div>
                </div>


                
            </div>
        )
    }
}
