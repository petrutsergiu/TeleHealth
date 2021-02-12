import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from './components/layout/Header';
import ViewDocuments from './components/user/ViewDocuments'
import { LoggedUserProvider } from './components/LoggedUser'
import WelcomePage from './components/user/WelcomePage'
import DoctorDetails from './components/user/Doctor/DoctorDetails'
import PatientDetails from './components/user/Patient/PatientDetails'
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import TwilioChat from './components/twilioChat/TwilioChat'
import TwilioVideo from './components/twilioVideo/VideoChat'
import SchedulerComponent from './components/scheduler/SchedulerComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route
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
                <Route path="/Appointments" component={Scheduler} />
                <Route path="/ViewDocuments" component={ViewDocuments} />
                <Route path="/ScheduleAppointment" component={SchedulerComponent} />
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
