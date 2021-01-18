import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import Card from './UiCard'
import MediaCard from './MediaCard'
import Container from '@material-ui/core/Container';
import Authenticator from './components/authentication';
import { InlineWidget } from "react-calendly";
import UploadFiles from './components/authentication/UploadFiles';

const App = () => {
  const [username, setUsername] = useState();

  return (
    <header>
      <Container fixed>
        <InlineWidget url="https://calendly.com/telehealth123" />
        <Authenticator setUsername={setUsername}>
          <div className="testies1">
            <h1>Welcome {username}</h1>
          </div>
          <UploadFiles />
          <Card />
        </Authenticator>
      </Container>
    </header>

  );
}


export default App;
