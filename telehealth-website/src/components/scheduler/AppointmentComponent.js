import React, {useState} from 'react';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { useLoggedUserState } from '../LoggedUser';

const AppointmentComponent = (props) => {
    const { data } = props;
    const { user } = useLoggedUserState();
    let color = data.status === 'unconfirmed' ? '#FFC107' : data.status === 'confirmed' ? '#00FF00' : '#FF0000';
    const handleClick = (onClick) => {
        if (user.role === 'Doctor' || data.patientId === user.id)
        {
            return onClick;
        }
        else
            return;
    }
    return (
        <Appointments.Appointment {...props}
            onDoubleClick={() => { }}
            style={{ ...props.style, backgroundColor: color, borderRadius: '8px' }}
            onClick={handleClick(props.onClick)}>
        </Appointments.Appointment>
    )
}
export default AppointmentComponent;