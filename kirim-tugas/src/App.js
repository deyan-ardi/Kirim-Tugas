import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//element import
import Login from "./components/auth/Login";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

//user element import
import Nav from "./components/user/Nav";
import Home from "./components/user/Home";
import Sent from "./components/user/Sent";
import Profile from "./components/user/Profile";
import Send from "./components/user/Send";

// import style
import "./assets/css/Style-App.css";

const App = () => {
  const [isLoggedIn, setLogged] = useState(localStorage.getItem("user"));

  return (
    <>
      <BrowserRouter>
        {(() => {
          if (isLoggedIn === "admin") {
            return (
              <>
                <Header />
                <Nav />
                <main>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/send/:id" component={Send} />
                    <Route path="/sent" exact component={Sent} />
                    <Route path="/profile" exact component={Profile} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
              </>
            );
          } else if (isLoggedIn) {
            return (
              <>
                <Header />
                <Nav />
                <main>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/send/:id" component={Send} />
                    <Route path="/sent" exact component={Sent} />
                    <Route path="/profile" exact component={Profile} />
                    <Route component={NotFound} />
                  </Switch>
                </main>
              </>
            );
          } else {
            return <Login setLogged={setLogged} />;
          }
        })()}
      </BrowserRouter>
    </>
  );
};

export default App;
