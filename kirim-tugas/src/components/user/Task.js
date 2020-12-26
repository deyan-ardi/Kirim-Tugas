import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    <div className="list">
      <div className="list-head">
        <h3>{task.matkul}</h3>
        <p className="code">Code: {task._id}</p>
        <p className="dec">{task.dec}</p>
      </div>
      <Link to={"send/" + task._id} className="list-foot">
        <p>Submit an assignment</p>
        <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default Task;
