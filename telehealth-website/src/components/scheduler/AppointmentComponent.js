import React from 'react';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const AppointmentComponent = (props) => {
    return (
        <Appointments.Appointment {...props} onDoubleClick={() => { }} />
    )
} 
export default AppointmentComponent;