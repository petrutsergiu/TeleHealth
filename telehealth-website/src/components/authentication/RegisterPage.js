import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import request from '../../helpers/request';

const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { onLogin } = props;

    const handleClick = (e, ...params) => {
        e.preventDefault();
        console.log('username:', username, password, role);
        const user = { username, password, role };

        request({
            url: `User/SignUpUser`,
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
                <Select
                    labelId="roleSelectLabel"
                    id="roleSelect"
                    value={role}
                    required
                    onChange={handleChange(setRole)}>
                    <MenuItem value={'Doctor'}>Doctor</MenuItem>
                    <MenuItem value={'Patient'}>Patient</MenuItem>
                </Select>
                <Button
                    color='primary'
                    type='submit'>
                    Register
                </Button>
            </form>
        </div>
    )
}

export default RegisterPage