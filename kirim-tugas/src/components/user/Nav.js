import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [getClass, setClass] = useState(["", "", ""]);
  const [isFirst, setFirst] = useState(true);

  const getFirst = () => {
    let path = window.location.pathname;
    path = path.split("/");
    path = path[1];

    if (isFirst) {
      switch (path) {
        case "sent":
          setClass(["", "active", ""]);

          break;
        case "profile":
          setClass(["", "", "active"]);

          break;
        default:
          setClass(["active", "", ""]);

          break;
      }
      setFirst(false);
    }
  };
  const classHandle = (event) => {
    let active;
    event.target.parentElement.parentElement.tagName === "LI"
      ? (active = parseInt(event.target.parentElement.parentElement.id))
      : (active = parseInt(event.target.parentElement.id));

    switch (active) {
      case 1:
        setClass(["", "active", ""]);
        break;
      case 2:
        setClass(["", "", "active"]);
        break;
      default:
        setClass(["active", "", ""]);
        break;
    }
  };

  return (
    <>
      <div className="nav" onLoad={getFirst()}>
        <ul>
          <li className={getClass[0]} id="0" onClick={classHandle}>
            <Link to="/">
              <i className="fas fa-home"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className={getClass[1]} id="1" onClick={classHandle}>
            <Link to="/sent">
              <i className="fas fa-bookmark"></i>
              <p>Sent</p>
            </Link>
          </li>
          <li className={getClass[2]} id="2" onClick={classHandle}>
            <Link to="/profile">
              <i className="fas fa-user"></i>
              <p>Profile</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
