import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logo: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}));

const AuthHeader = (props) => {
  const classes = useStyles();
  const { push } = useHistory();
  const goToHome = useCallback(() => {
    push('/');
  }, [push]);
  const goToAccount = useCallback(() => {
    push('/Account');
  }, [push]);

  const logout = useCallback(() => {
    push('/Login');
  }, [push]);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        className={classes.logo}
        onClick={goToHome}
      >
        TeleHealth
      </Typography>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={goToAccount}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Link href="/Login" color="inherit">
        Logout
      </Link>
    </>
  );
};

export default AuthHeader;
