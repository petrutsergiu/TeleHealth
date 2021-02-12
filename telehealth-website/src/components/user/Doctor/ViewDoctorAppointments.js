import React, { useState, useEffect } from 'react';
import request from '../../../helpers/request';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ViewDoctorAppointments = () => {

    const [appointments, setAppointments] = useState();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [patients, setPatients] = useState();

    useEffect(() =>
        request({
            url: `UserDetails/GetPatientDetailsByDoctor`,
            method: 'get',
            port: 49836,
        }).then((res) => {
            console.log('pacienti',res.content)
            setPatients(res.content);
            request({
                url: `Appointments/GetAllDoctorAppointments`,
                method: 'get',
                port: 59562,
            }).then((rez) => {
                console.log('appitnem', rez.content);
                setAppointments(covertToData(res.content,rez.content));
                console.log('dupa conversie', appointments);
                setIsLoading(true);
            })
        })
        , [])

    const getPatientName = (id,dbPatients) => {
        console.log('pacienti2',dbPatients)
        let patient = dbPatients.find(p => p.credentialsId === id);
        return patient.firstName + ' ' + patient.lastName;
    }

    const covertToData = (dbPatients,dbAppointments) => {
        const newData = dbAppointments.map((ap) => ({
            id: ap.appointmentId,
            startDate: new Date(ap.from).toLocaleString(),
            endDate: new Date(ap.to).toLocaleString(),
            title: ap.title,
            allDay: ap.allDay,
            notes: ap.notes,
            patientId: ap.patientId,
            patientName: getPatientName(ap.patientId,dbPatients),
            doctorId: ap.doctorId,
            fromDB: true,
            status: ap.status
        }));
        return newData;
    }


    return isLoading && (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Appointments</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">From</TableCell>
                        <TableCell align="right">To</TableCell>
                        <TableCell align="right">Notes</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((ap, index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{ap.patientName}</TableCell>
                            <TableCell align="right">{ap.title}</TableCell>
                            <TableCell align="right">{ap.startDate}</TableCell>
                            <TableCell align="right">{ap.endDate}</TableCell>
                            <TableCell align="right">{ap.notes}</TableCell>
                            <TableCell align="right">{ap.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ViewDoctorAppointments;