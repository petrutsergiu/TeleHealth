import React, { useState } from 'react';
import request from '../../helpers/request';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { gotoRegister, onLogin } = props;

    const handleClick = (e, ...params) => {
        e.preventDefault();
        console.log('username:', username, password);
        const user = { username, password };

        request({
            url: `User/LoginUser`,
            method: 'post',
            data: user,
            port : 49836,
        }).then((res) => onLogin(res.content));
    }

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <TextField
                    type='text'
                    name='username'
                    label='Username'
                    fullWidth
                    required
                    value={username}
                    onChange={handleChange(setUsername)} />
                <TextField
                    type='password'
                    name='password'
                    label='Password'
                    fullWidth
                    required
                    value={password}
                    onChange={handleChange(setPassword)} />
                <Button
                    color='primary'
                    type='submit'>
                    Login
            </Button>
            </form>
            <Button onClick={gotoRegister}>
                Register
        </Button>
        </div>
    )
}

export default LoginPage;