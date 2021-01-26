import React from 'react';
import {useLoggedUserState} from '../LoggedUser';

const WelcomePage = () =>
{
    const {user} = useLoggedUserState();
    return (
        <div className="testies1">
        <h1>Welcome {user.username} </h1>
      </div>
    )
}

export default WelcomePage;