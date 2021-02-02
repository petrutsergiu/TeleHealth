import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import request from '../../helpers/request';


const SchedulerComponent = (props) => {

  const appointments =
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: 'Room 1',
  };
  const [data, setData] = useState([]);
  const selectedDoctor = props;

  const saveChanges = (data) => {
    const doctorId = selectedDoctor.selectedDoctor.credentialsId;

    const appointments = data.map((ap) => ({
      appointmentId: ap.id,
      from: ap.startDate,
      to: ap.endDate,
      title: ap.title,
      allday: ap.allDay,
      notes : ap.notes,
      doctorId: doctorId
    }));
    request({
      url: `Appointments/SaveAppointments`,
      method: 'post',
      data: appointments,
      port: 59562,
    });
  }

  useEffect(()=>{
    request({
      url: `Appointments/GetAppointments`,
      method: 'get',
      port: 59562,
    });
  },[])


  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      console.log(added);
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
      saveChanges([...data, { id: startingAddedId, ...added }]);
    }
    else if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }

    else if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
  }



  return (
    <Paper>
      {selectedDoctor.firstName}
      <Scheduler
        data={data}
        height={660}
      >
        <ViewState
          currentDate={new Date()}
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <IntegratedEditing />
        <DayView
          startDayHour={9}
          endDayHour={19}
        />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
}

export default SchedulerComponent;

