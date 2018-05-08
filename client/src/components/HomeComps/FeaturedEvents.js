import React, { Component } from "react";
import { Carousel, Panel } from 'react-bootstrap';

export class FeaturedEvents extends Component {
    state = {
        indicators: false,
        controls: true,
        interval: null
    }

    render() {
      const featuredEvents = this.props.data.slice(0,4)
      console.log('What is events?', featuredEvents)
        return (


            <div>

                <Panel className='eventCard z-depth-2'>
                    <h1>Featured Events</h1>
                    <Carousel
                        indicators={this.state.indicators}
                        controls={this.state.controls}
                        interval={this.state.interval}
                    >
                        {this.props.data.map((event, i) => {
                            return (
                                <Carousel.Item key={i}>
                                    <img style={{display: 'inline-block', height: '250px'}}className= 'featured-event'alt="900x500" src={event.img_url} />
                                    <h3 style={{position: 'relative', top: 0, marginTop: '-40px', color: '#fbfbfb', marginLeft: '50px' }}>{event.title}</h3>
                                </Carousel.Item>
                                
                            )
                        })}
                    </Carousel>
                </Panel>
            </div>

        )
    }
}