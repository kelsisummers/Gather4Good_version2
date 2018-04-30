import { Carousel } from 'react-bootstrap';
import React from "react";

export const Header = (props) => {
    return (
        <div>
            <Carousel
                indicators={props.indicators}
                controls={props.controls}
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