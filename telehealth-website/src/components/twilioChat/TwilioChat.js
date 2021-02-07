import React, { useState, useCallback } from "react";
import Button from '@material-ui/core/Button';
import WelcomeScreen from "./WelcomeScreen";
import ChatScreen from "./ChatScreen";

function TwilioChat() {
  const [isChat, setIsChat] = useState(true);

  const toggleView = useCallback(() => {
    setIsChat(!isChat);
  }, [isChat, setIsChat]);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={toggleView}>
        Toggle Chat View
      </Button>
      {isChat ? <ChatScreen /> : <WelcomeScreen />}
    </>
  );
}

export default TwilioChat;
