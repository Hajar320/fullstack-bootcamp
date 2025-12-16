import React, { Component } from "react";
//import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./App.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "./11.jpg";
import img2 from "./12.webp";
import img3 from "./13.webp";
import img4 from "./14.webp";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src={img1} alt="iji" />
          <p className="legend">Hong Kong</p>
        </div>
        <div>
          <img src={img2} alt="ij" />
          <p className="legend">Macao</p>
        </div>
        <div>
          <img src={img3} alt="uih" />
          <p className="legend">Japan</p>
        </div>
        <div>
          <img src={img4} alt="uihl" />
          <p className="legend">Las Vegas</p>
        </div>
      </Carousel>
    );
  }
}

export default DemoCarousel;
