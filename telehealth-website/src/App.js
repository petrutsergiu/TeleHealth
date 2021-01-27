import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import Card from './UiCard'
import MediaCard from './MediaCard'
import Container from '@material-ui/core/Container';
import Authenticator from './components/authentication';
import { InlineWidget } from "react-calendly";
import UploadFiles from './components/authentication/UploadFiles';
import Agora from "./components/agora/Agora"
import ViewDocuments from './components/user/ViewDocuments'
import {LoggedUserProvider} from './components/LoggedUser'
import WelcomePage from './components/user/WelcomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  return (
    <header>
      <Container fixed>
        <Router>
        <LoggedUserProvider>
          <Authenticator >
            <Switch>
              <Route path="/" component={WelcomePage} exact/>
              <Route path="/UploadFiles" component={UploadFiles}/>
              <Route path="/ViewDocuments" component={ViewDocuments}/>
            </Switch>
            
          </Authenticator>
        </LoggedUserProvider>
        </Router>
      </Container>
    </header>

  );
}


export default App;
