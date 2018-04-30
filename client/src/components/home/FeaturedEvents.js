import React, { Component } from "react";
import { Carousel, Jumbotron } from 'react-bootstrap';

export class FeaturedEvents extends Component {
    state = {
        indicators: false,
        controls: false,
        interval: 3000
    }

    render() {
        return (

            <div>
                <Jumbotron>
                    <h1>Featured Events</h1>
                    <Carousel
                        indicators={this.state.indicators}
                        controls={this.state.controls}
                        interval={this.state.interval}
                    >
                        {this.props.data.map((event) => {
                            return (
                                <Carousel.Item>
                                    <img width={1440} height={500} alt="900x500" src={event.img_url} />
                                    <h3>{event.title}</h3>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Jumbotron>
            </div>

        )
    }
}