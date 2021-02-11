import React from 'react';
import {AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui'; 
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import { useHistory } from "react-router-dom";

const AppointmentTooltipContent = (props) => {
    console.log('===> APP T Content', props)
    const history = useHistory();
    const {appointmentData} =props;
    let nowDate = new Date();

    const handleVideoOnClick = () =>{
        history.push('/VideoCall',{doctorId:appointmentData.doctorId});
    }
    let videoClick = (<></>);
    const handleChatOnClick = () =>{
        history.push('/Chat',{doctorId:appointmentData.doctorId});
    }
    const chatClick =(<ChatIcon onClick ={handleChatOnClick}/>);

    if (appointmentData.startDate <= nowDate && nowDate <= appointmentData.endDate)
    {
        videoClick = (<VideoCallIcon onClick ={handleVideoOnClick}/>);
    }
    return (
        <AppointmentTooltip.Content {...props}>
        {videoClick}
        {chatClick}
        </AppointmentTooltip.Content>
    )
}

export default AppointmentTooltipContent;