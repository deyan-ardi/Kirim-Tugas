import React from "react";
import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <i className="fas fa-paper-plane"></i>
          <h3>Kirim Tugas</h3>
        </div>
      </div>
    );
  }
}

export default Header;
