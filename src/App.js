import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Gantt from "./components/gantt";
import NotFound from "./components/notFound";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Switch>
          <Route path="/gantt" component={Gantt}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/gantt" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
