import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Authenticator from './components/authentication';
import Header from './components/layout/Header';
import UploadFiles from './components/authentication/UploadFiles';
import ViewDocuments from './components/user/ViewDocuments'
import ViewDoctors from './components/user/ViewDoctors'
import { LoggedUserProvider } from './components/LoggedUser'
import WelcomePage from './components/user/WelcomePage'
import DoctorDetails from './components/user/DoctorDetails'
import PatientDetails from './components/user/PatientDetails'
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import TwilioChat from './components/twilioChat/TwilioChat'
import TwilioVideo from './components/twilioVideo/VideoChat'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Scheduler from './components/scheduler/SchedulerComponent';


const App = () => {

  return (
    <header>
      <Container fixed>
        <Router>
          <LoggedUserProvider>
            <Header />
            <Box p={3}>
              <Switch>
                <Route path="/Chat" component={TwilioChat} />
                <Route path="/VideoCall" component={TwilioVideo} />
                <Route path="/PatientDetails" component={PatientDetails} />
                <Route path="/DoctorDetails" component={DoctorDetails} />
                <Route path="/Registration" component={RegisterPage} />
                <Route path="/Login" component={LoginPage} />
                <Route path="/" component={WelcomePage} />
              </Switch>
            </Box>
          </LoggedUserProvider>
        </Router>
      </Container>
    </header>

  );
}


export default App;
