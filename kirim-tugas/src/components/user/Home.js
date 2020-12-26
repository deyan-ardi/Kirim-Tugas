import React, { useEffect, useState } from "react";
import axios from "axios";

//import component
import Task from "./Task";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const getTask = () => {
    const userData = {
      user: localStorage.getItem("user"),
    };
    axios
      .post("http://localhost:4000/task/incoming", userData)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getTask, []);
  return (
    <div className="home-container">
      {tasks.map((task, i) => (
        <Task key={i} task={task} />
      ))}
    </div>
  );
};

export default Home;
