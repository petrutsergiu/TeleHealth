import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Authenticator from './components/authentication';
import UploadFiles from './components/authentication/UploadFiles';
import Agora from "./components/agora/Agora"
import ViewDocuments from './components/user/ViewDocuments'
import ViewDoctors from './components/user/ViewDoctors'
import { LoggedUserProvider } from './components/LoggedUser'
import WelcomePage from './components/user/WelcomePage'
import DoctorDetails from './components/user/DoctorDetails'
import PatientDetails from './components/user/PatientDetails'
import LoginPage from './components/authentication/LoginPage';
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
            <Switch>
              <Route path="/PatientDetails" component={PatientDetails} />
              <Route path="/DoctorDetails" component={DoctorDetails} />
              <Route path="/Registration" component={Authenticator} />
              <Route path="/Login" component={LoginPage} />
              <Route path="/" component={WelcomePage} />
            </Switch>
          </LoggedUserProvider>
        </Router>
      </Container>
    </header>

  );
}


export default App;
