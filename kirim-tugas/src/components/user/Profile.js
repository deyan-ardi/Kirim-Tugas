import React, { useState, useEffect } from "react";
import axios from "axios";

//assets import
import userPhotos from "../../assets/img/user.png";

const Profile = () => {
  const [toggle, setToggle] = useState("");
  const [incoming, setIncoming] = useState(0);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    const userData = {
      user: localStorage.getItem("user"),
    };
    axios
      .post("http://localhost:4000/task/incoming", userData)
      .then((res) => {
        setIncoming(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:4000/task/sent", userData)
      .then((res) => {
        setSent(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const toggleBtn = () => {
    if (!toggle) {
      setToggle("show");
    } else {
      setToggle("");
    }
  };
  const logoutHandle = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
  };
  return (
    <>
      <div className={"modal " + toggle}>
        <div className="card">
          <h3>Are you sure want to log out?</h3>
          <div className="btns">
            <button className="btn cancel" onClick={toggleBtn}>
              <p> Cancel </p>
            </button>
            <button className="btn logout" onClick={logoutHandle}>
              <p> Logout </p>
            </button>
          </div>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-area">
          <div className="profile-header">
            <img src={userPhotos} alt="" />
            <h3> Komang Jepri Kusuma Jaya </h3>
            <p>
              <span className="nim"> 1915051025 </span>, Registered as PTI 2D
            </p>
          </div>
          <div className="profile-status">
            <div className="st">
              <h3> {incoming} </h3>
              <p> Incoming </p>
            </div>
            <div className="st">
              <h3> {sent} </h3>
              <p> Sended </p>
            </div>
            <button className="st logout" onClick={toggleBtn}>
              <i className="fas fa-sign-out-alt"></i>
              <p> Logout </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
