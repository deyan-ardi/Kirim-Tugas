import React from "react";
import { Component } from "react";

//assets import
import NotFoundImg from "../assets/img/notfound.png";
import "../assets/css/NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-container">
        <div className="img">
          <img src={NotFoundImg} alt="" />
        </div>
        <div className="text">
          <h1>OH SNAP! 404</h1>
          <p>You have gone to the space and nothing here...</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
