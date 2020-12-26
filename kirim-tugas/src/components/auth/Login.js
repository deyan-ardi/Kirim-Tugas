import React, { useState } from "react";
import axios from "axios";

// import style
import "../../assets/css/Login.css";

const Login = ({ setLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const inputCheck = () => {
    if (!username && !password) {
      setError("Username and Password required!");
      return false;
    } else if (!username) {
      setError("Username required!");
      return false;
    } else if (!password) {
      setError("Password required!");
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    let check = inputCheck();
    if (check) {
      const userData = {
        _id: username,
        code: password,
      };
      axios
        .post("http://localhost:4000/user/auth", userData)
        .then((res) => {
          if (res.data.message) {
            throw res.data.message;
          } else {
            setLogged(res.data[0]._id);
            localStorage.setItem("user", res.data[0]._id);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-paper-plane"> </i> <h3> Kirim Tugas </h3>
        </div>
        <div className="login-main">
          {!error ? (
            ""
          ) : (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <form method="post" onSubmit={submitHandler}>
            <div className="in username">
              <label htmlFor="username">
                <i className="fas fa-user"> </i>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={usernameChange}
              />
            </div>
            <div className="in pass">
              <label htmlFor="pass">
                <i className="fas fa-lock"> </i>
              </label>
              <input
                type="password"
                id="pass"
                placeholder="Password"
                onChange={passwordChange}
              />
            </div>
            <div className="submit">
              <button type="submit"> Login </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
