import React, { useState, useEffect } from 'react';
import { useLoggedUserState } from '../LoggedUser';
import ViewDoctors from './ViewDoctors'
import DoctorWelcomePage from './Doctor/DoctorWelcomePage';
import PatientWelcomePage from './Patient/PatientWelcomePage';
import request from '../../helpers/request';

const WelcomePage = () => {
  const { user } = useLoggedUserState();
  const [detailedUser, setDetailedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.id && !isLoading) {
      request({
        url: user.role === 'Doctor' ? `UserDetails/GetDoctorDetails` : `UserDetails/GetPatientDetails`,
        method: 'get',
        port: 49836,
      }).then((res) => {
        setDetailedUser(res.content);
        setIsLoading(true);
      })
    }
  }, [])

  const isLoggedIn = () => {
    if (user && user.id && detailedUser && detailedUser.firstName) {
      return (
        <div>
          { user.role === 'Doctor' ? (<DoctorWelcomePage doctor={detailedUser} />) : (<PatientWelcomePage patient={detailedUser} />)}
        </div>
      )
    }
    else {
      return (
        <div>
          Welcome to this spectacular app!!
          <br></br>
          <ViewDoctors />
        </div>
      )
    }
  }

  return isLoggedIn();
}

export default WelcomePage;