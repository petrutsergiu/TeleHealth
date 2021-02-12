import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  AllDayPanel,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import request from '../../helpers/request';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import AppointmentTooltipHeader from './AppointmentTooltipHeader';
import AppointmentComponent from './AppointmentComponent';
import AppointmentTooltipContent from './AppointmentTooltipContent';

import { useLoggedUserState } from '../LoggedUser';


const SchedulerComponent = (props) => {

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDateChange] = useState(new Date());
  const { user, setUser } = useLoggedUserState();
  const { selectedDoctor } = props.location.state;
  const doctorId = selectedDoctor.credentialsId;

  const currentDateChange = (currentDate) => {
    setCurrentDateChange(currentDate);
  }

  const saveChanges = (data) => {

    const appointments = data.filter(appointment => appointment.fromDB === undefined).map((ap) => ({
      appointmentId: ap.id,
      from: Date.parse(ap.startDate),
      to: Date.parse(ap.endDate),
      title: ap.title,
      allday: ap.allDay,
      notes: ap.notes,
      doctorId: doctorId,
      status: ap.status
    }));
    request({
      url: `Appointments/SaveAppointments`,
      method: 'post',
      data: appointments,
      port: 59562,
    }).then(() => {
      setData(data.map((a) => {
        return (
          { ...a, fromDB: true }
        )
      }))
    });
  }

  const covertToData = (dbAppointments) => {
    const newData = dbAppointments.map((ap) => ({
      id: ap.appointmentId,
      startDate: new Date(ap.from),
      endDate: new Date(ap.to),
      title: ap.title,
      allDay: ap.allDay,
      notes: ap.notes,
      patientId: ap.patientId,
      doctorId: ap.doctorId,
      fromDB: true,
      status: ap.status
    }));
    return newData;
  }

  const onCommitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, status: 'unconfirmed', ...added }]);
      saveChanges([...data, { id: startingAddedId, status: 'unconfirmed', ...added }]);
    }
    else if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      saveChanges(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }

    else if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
      saveChanges(data.filter(appointment => appointment.id !== deleted));
    }
  };

  const confirmAppointment = () =>{
    
  }

  useEffect(() => {
    let appointment = { doctorId };
    request({
      url: `Appointments/GetAppointments`,
      method: 'post',
      data: appointment,
      port: 59562,
    }).then((res) => setData(covertToData(res.content)));
  }, [doctorId])

  return (
    <div>
      <Paper>
        <Typography align="center" variant="h4" component="h2">
          {selectedDoctor.firstName}    {selectedDoctor.lastName}
        </Typography>

        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={19}
          />
          <MonthView />
          <Appointments
            appointmentComponent={AppointmentComponent}
          />
          <ConfirmationDialog
            ignoreCancel
          />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            headerComponent={AppointmentTooltipHeader}
            contentComponent={AppointmentTooltipContent}
          />
          <AppointmentForm

          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AllDayPanel />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default SchedulerComponent;
