import React from 'react';
import {AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui'; 

const AppointmentTooltipHeader = (props) => {
  const {appointmentData} =props;
  if (appointmentData.fromDB)
  return null;

  return (
    <AppointmentTooltip.Header {...props} />
  )
};

export default AppointmentTooltipHeader;
