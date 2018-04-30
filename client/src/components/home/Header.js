import { Carousel } from 'react-bootstrap';
import React, { Component } from "react";

export class Header extends Component {
    state = {
        indicators: false,
        controls: false,
        interval: 5000
    }
    
    render() {
        return (
            <div>
                <Carousel
                    indicators={this.state.indicators}
                    controls={this.state.controls}
                    interval={this.state.interval}
                >
                    <Carousel.Item>
                        <img width={1440} height={500} alt="900x500" src="../assets/science_color.jpg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1440} height={500} alt="900x500" src="../assets/fullpride.jpg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1440} height={500} alt="900x500" src="../assets/immigration.jpg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1440} height={500} alt="900x500" src="../assets/protest-header_signs.jpg" />
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}