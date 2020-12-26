import React from "react";
import { Component } from "react";
import axios from "axios";

//import component
import TaskSent from "./TaskSent";

class Sent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
    };
  }
  componentDidMount() {
    this.getTask();
  }

  getTask() {
    const userData = {
      user: localStorage.getItem("user"),
    };
    axios
      .post("http://localhost:4000/task/sent", userData)
      .then((res) => {
        this.setState({ task: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="sent-container">
        {this.state.task.map((task, i) => (
          <TaskSent key={i} task={task} />
        ))}
      </div>
    );
  }
}

export default Sent;
