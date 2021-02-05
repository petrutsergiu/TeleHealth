import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AuthHeader from './AuthHeader';
import UnauthHeader from './UnauthHeader';
import { useLoggedUserState } from '../../LoggedUser';

const Header = (props) => {
  const { user } = useLoggedUserState();
  const isLogged = user && Object.keys(user).length;

  return (
    <AppBar position="static">
      <Toolbar>
        {isLogged ? <AuthHeader /> : <UnauthHeader />}
      </Toolbar>
    </AppBar>
  )
};

export default Header;
