import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useLoggedUserState } from '../LoggedUser';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DoctorDetails from './DoctorDetails';
import ViewDoctors from './ViewDoctors'
import Agora from '../agora/Agora'

const WelcomePage = () => {
  const { user, setUser } = useLoggedUserState();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleMyAccountClose = () => {
    setAnchorEl(null);
    if (user && user.role == 'Patient')
      history.push('/PatientDetails');
    else if (user && user.role == 'Doctor')
      history.push('/DoctorDetails');

  };
  const handleLogOutClose = () => {
    setAnchorEl(null);
    setUser({});
  };

  const handleClick = (e) => {
    if (e.currentTarget.id == 'SignUp') {
      console.log('reg baa');
      history.push('/Registration')
    }
    else if (e.currentTarget.id == 'SignIn') {
      console.log('log baa');
      history.push('/Login')
    }
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = () => {
    if (user.id) {
      return (
        <div>
          Welcome {user.username}
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleMyAccountClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOutClose}>Logout</MenuItem>
          </Menu>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <ViewDoctors />
          <Agora/>
        </div>
      )
    }
    else {
      return (
        <div>
          Welcome to this favulos crap!!
          <form>
            <Button id='SignUp' onClick={handleClick}>
              Sign Up
            </Button>
            <Button id='SignIn' onClick={handleClick}>
              Sign In
            </Button>
          </form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <ViewDoctors />
          <Agora/>
        </div>
      )
    }
  }

  return isLoggedIn();
}

export default WelcomePage;