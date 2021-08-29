import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router basename="/">
      <UserProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/chat/:entryCode" component={ChatPage} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
