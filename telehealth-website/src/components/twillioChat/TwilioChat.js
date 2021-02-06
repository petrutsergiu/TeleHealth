import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import ChatScreen from "./ChatScreen";

function TwilioChat() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chat" component={ChatScreen} />
        <Route path="/ws" component={WelcomeScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default TwilioChat;