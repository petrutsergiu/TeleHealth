import React from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useHistory } from "react-router-dom";
import { useLoggedUserState } from '../LoggedUser';


const AppointmentTooltipContent = (props) => {
    const history = useHistory();
    const { appointmentData } = props;
    const { user } = useLoggedUserState();
    let nowDate = new Date();

    const handleVideoOnClick = () => {
        history.push('/VideoCall', { doctorId: appointmentData.doctorId });
    }
    let videoClick = (<></>);
    const handleChatOnClick = () => {
        history.push('/Chat', { doctorId: appointmentData.doctorId });
    }
    const chatClick = (<ChatIcon onClick={handleChatOnClick} />);

    if (appointmentData.startDate <= nowDate && nowDate <= appointmentData.endDate) {
        videoClick = (<VideoCallIcon onClick={handleVideoOnClick} />);
    }

    const handleConfirmAppointment = () => {
        ///???
    }
    let appointmentConfirmed = <></>;
    if (user.role === 'Doctor' && appointmentData.status === 'unconfirmed')
        appointmentConfirmed = (<VerifiedUserIcon onClick={handleConfirmAppointment} />);

    return (
        <AppointmentTooltip.Content {...props}>
            {videoClick}
            {chatClick}
            {appointmentConfirmed}
        </AppointmentTooltip.Content>
    )
}

export default AppointmentTooltipContent;