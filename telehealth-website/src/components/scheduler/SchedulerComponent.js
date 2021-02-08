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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AppointmentTooltipHeader from './AppointmentTooltipHeader';


const SchedulerComponent = (props) => {

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDateChange] = useState(new Date());
  const [currentViewName, setCurrentViewName] = useState();
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);

  const selectedDoctor = props;
  const doctorId = selectedDoctor.selectedDoctor.credentialsId;

  const ExternalViewSwitcher = ({
    currentViewName,
    onChange,
  }) => (
    <RadioGroup
      aria-label="Views"
      style={{ flexDirection: 'row' }}
      name="views"
      value={currentViewName}
      onChange={onChange}
    >
      <FormControlLabel value="Week" control={<Radio />} label="Week" />
      <FormControlLabel value="Month" control={<Radio />} label="Month" />
    </RadioGroup>
  );

  const currentViewNameChange = (e) => {
    setCurrentViewName(e.target.value);
  }
  const currentDateChange = (currentDate) => {
    setCurrentDateChange(currentDate);
  }

  const saveChanges = (data) => {
    const appointments = data.map((ap) => ({
      appointmentId: ap.id,
      from: ap.startDate,
      to: ap.endDate,
      title: ap.title,
      allday: ap.allDay,
      notes: ap.notes,
      doctorId: doctorId
    }));
    request({
      url: `Appointments/SaveAppointments`,
      method: 'post',
      data: appointments,
      port: 59562,
    });
  }

  const covertToData = (dbAppointments) => {
    const newData = dbAppointments.map((ap) => ({
      id: ap.appointmentId,
      startDate: ap.from,
      endDate: ap.to,
      title: ap.title,
      allDay: ap.allDay,
      notes: ap.notes,
      disabled: true
    }));
    return newData;
  }

  const timeTableCell = ({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={!isAppointmentBeingCreated ? onDoubleClick : undefined}
    />
  );


  const onCommitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
      saveChanges([...data, { id: startingAddedId, ...added }]);
      setIsAppointmentBeingCreated(true);
    }
    else if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      saveChanges(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        setIsAppointmentBeingCreated(false);
    }

    else if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
      saveChanges(data.filter(appointment => appointment.id !== deleted));
      setIsAppointmentBeingCreated(false);
    }
  };

  useEffect(() => {
    console.log('doftoru', doctorId);
    let appointment = { doctorId };
    request({
      url: `Appointments/GetAppointments`,
      method: 'post',
      data: appointment,
      port: 59562,
    }).then((res) => setData(covertToData(res.content)));
  }, [])

  return (
    <div>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={currentViewNameChange}
      />
      <Paper>
        {selectedDoctor.firstName}

        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={19}
            timeTableCellComponent={timeTableCell}
          />
          <MonthView />
          <Appointments />
          <ConfirmationDialog
            ignoreCancel
          />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            headerComponent={AppointmentTooltipHeader}
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
