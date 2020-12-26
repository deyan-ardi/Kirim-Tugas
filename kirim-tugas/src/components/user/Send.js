import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Send = ({ match }) => {
  const [data, setData] = useState("");
  const [fileLoc, setFileloc] = useState("No file Choosen");
  const [toggle, setToggle] = useState("");
  const [isReady, setReady] = useState("");
  const [fileType, setFileType] = useState("");
  const [status, setStatus] = useState(false);

  const loadData = () => {
    fetch("http://localhost:4000/task/" + match.params.id)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };

  useEffect(loadData, []);

  const fileFormat = (extention, format) => {
    format = format.split("|");

    extention = extention.split(".");

    let rest = format.find((rest) => {
      return rest === extention[extention.length - 1];
    });

    if (rest) {
      setFileType(rest);
      return true;
    } else {
      return false;
    }
  };
  const getFileLoc = (e) => {
    if (fileFormat(e.target.files[0].name, data.req)) {
      setFileloc(e.target.files[0]);
      setReady("ready");
    } else {
      setFileloc({ name: "Please check your file extension!" });
      setReady("");
    }
  };

  const toggleBtn = () => {
    if (isReady) {
      if (!toggle) {
        setToggle("show");
      } else {
        setToggle("");
      }
    }
  };

  const updateHandle = (fileData) => {
    axios
      .put("http://localhost:4000/upload/file", fileData)
      .then(() => {
        setStatus(true);
        window.location.href = "/sent";
      })
      .catch(() => {
        setStatus(false);
      });
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const fileData = new FormData();

    fileData.append("file", fileLoc);
    fileData.append("type", fileType);
    fileData.append("user", localStorage.getItem("user"));
    fileData.append("task", match.params.id);

    axios
      .post("http://localhost:4000/upload/file", fileData)
      .then(() => {
        updateHandle(fileData);
      })
      .catch(() => {
        setStatus(false);
      });
  };

  return (
    <>
      <div className={"modal " + toggle}>
        <div className="card">
          <h3>Are you sure want to send this file?</h3>
          <div className="btns">
            <button className="btn cancel" onClick={toggleBtn}>
              <p> Cancel </p>
            </button>
            <form method="post">
              <input
                type="file"
                name="taskFile"
                id="file"
                onChange={getFileLoc}
              />
              <button className="btn logout ready" onClick={submitHandle}>
                <p> Send it </p>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="send-container">
        <div className="send-area">
          <div className="send-header">
            <h3>{data.matkul}</h3>
            <p>
              Code: <span className="nim">{data._id}</span> Required:
              <span className="req">{data.req}</span> Uploaded:
              <span className="req">{data.date}</span>
            </p>
          </div>
          <div className="send-status">
            <p>{data.dec}</p>
            <div className="upload">
              <div className="get-file">
                <label htmlFor="file" className="label-file">
                  Choose your file
                </label>
                <span className="req file">
                  <p>{fileLoc.name}</p>
                </span>
              </div>
              <button className={"st add " + isReady} onClick={toggleBtn}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Send;
