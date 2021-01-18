import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Authenticator = (props) => {

    const [user, setUser] = useState();
    const {children, setUsername} = props;
    const [authStep, setAuthStep] = useState('login');
    console.log(user);
    console.log(authStep);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user, setUsername]);
    
    if (user) {
        return children;
    }
    
    switch (authStep) {
        case 'register':
            return <RegisterPage onLogin={setUser} />

        default:
            return <LoginPage onLogin={setUser} gotoRegister={ () =>setAuthStep('register')} />
    }

}

export default Authenticator;
