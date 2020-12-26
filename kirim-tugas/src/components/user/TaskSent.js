import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskSent = ({ task }) => {
  const [uploadOn, setUpload] = useState("");
  useEffect(() => {
    task.user.filter((user) => {
      if (user._id === localStorage.getItem("user")) {
        setUpload(user.uploaded);
      }
      return task;
    });
  });
  return (
    <div className="list">
      <div className="list-head">
        <h3>{task.matkul}</h3>
        <p className="code">Code: {task._id}</p>
        <p className="status">
          Uploaded on <span className="date">{uploadOn}</span>
        </p>
        <p></p>
        <p className="dec">{task.dec}</p>
      </div>
      <Link to={"send/" + task._id} className="list-foot">
        <p>Submit a Revision</p>
        <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default TaskSent;
