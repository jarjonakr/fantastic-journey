import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
