import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PatientDetails from '../user/PatientDetails';
import DoctorDetails from '../user/DoctorDetails';
import {useLoggedUserState} from '../LoggedUser';




const Authenticator = (props) => {

    const {user, setUser} = useLoggedUserState();
    const { children } = props;
    const [authStep, setAuthStep] = useState('login');
    console.log(user);
    console.log(authStep);

   if (user && user.username) {
        console.log(user);
        if (user.role == 'Patient' && !user.completedAccount)
            return <PatientDetails />
        else if (user.role == 'Doctor' && !user.completedAccount)
            return <DoctorDetails />
        else
            return children;

    }

    switch (authStep) {
        case 'register':
            return <RegisterPage onLogin={setUser} />

        default:
            return <LoginPage onLogin={setUser} gotoRegister={() => setAuthStep('register')} />
    }

}

export default Authenticator;
