import React, { useState } from 'react';
import request from '../../helpers/request';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { useLoggedUserState } from '../LoggedUser';


const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { user, setUser } = useLoggedUserState();


    const handleClick = (e, ...params) => {
        e.preventDefault();
        console.log('username:', username, password);
        const user = { username, password };

        request({
            url: `User/LoginUser`,
            method: 'post',
            data: user,
            port : 49836,
        }).then((res) => {
            console.log(res.content);
            setUser(res.content);
            history.push('/')
        });

    }

    const gotoRegister = () =>{
        history.push('/Registration');
    }

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    }

    return (
      <Container maxWidth="sm">
        <Paper>
          <Box p={3}>
              <form onSubmit={handleClick}>
                  <Grid container direction="column" spacing={3}>
                      <Grid item>
                          <TextField
                              type='text'
                              name='username'
                              label='Username'
                              fullWidth
                              required
                              value={username}
                              onChange={handleChange(setUsername)}
                          />
                      </Grid>
                      <Grid item>
                          <TextField
                              type='password'
                              name='password'
                              label='Password'
                              fullWidth
                              required
                              value={password}
                              onChange={handleChange(setPassword)}
                          />
                      </Grid>
                      <Grid container item justify="space-around">
                          <Grid item>
                              <Button
                                  color='primary'
                                  type='submit'
                                  variant="contained"
                              >
                                  Login
                              </Button>
                          </Grid>
                          <Grid item>
                              <Button onClick={gotoRegister}>
                                  Register
                              </Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </form>
          </Box>
        </Paper>
      </Container>
    );
}

export default LoginPage;
