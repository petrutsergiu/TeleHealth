import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Typography, DialogTitle, DialogContent, DialogActions, Button, Dialog } from '@material-ui/core';
import { Alert, Rating } from '@material-ui/lab';
import { useLoggedUserState } from '../LoggedUser';
import request from '../../helpers/request';
import { LeakAddTwoTone } from '@material-ui/icons';

const ViewDoctorDetails = (props) => {

    const { selectedDoctor, setSelectedDoctor } = props;
    const [open, setOpen] = useState(true);
    const { user, setUser } = useLoggedUserState();
    const [alert, setAlert] = useState(false);
    const [rating, setRating] = useState(2);
    const history = useHistory();

    const handleDialogClose = () => {
        setSelectedDoctor();
        setOpen(false);
    }
    const handleScheduleButton = () => {
        if (!user.id) {
            setAlert(true);
        }
        else {
            history.push('/ScheduleAppointment', { selectedDoctor });
        }
    }
    const onChangeRating = (e) => {
        setRating(parseInt(e.target.value,10));

    }
    const handleRatingButton = () => {
        console.log(selectedDoctor);
        console.log('ratingu selectat de user',rating)
        let currentDoctorRating = selectedDoctor.rating;
        console.log('Rating curent',currentDoctorRating);
        let numberOfRatings = selectedDoctor.numberOfRatings;
        console.log('Nr de ratings curenti',numberOfRatings);
        let newRating = ((currentDoctorRating * numberOfRatings) + rating) / (numberOfRatings + 1);
        console.log('CALCUL 1',(currentDoctorRating * numberOfRatings));
        console.log('CALCUL 2',(currentDoctorRating * numberOfRatings)+ rating);
        console.log('noul rating',newRating);
        let updatedDoctor = { ...selectedDoctor, rating: newRating, numberOfRatings: numberOfRatings + 1 };
        console.log(updatedDoctor);

        request({
            url: `UserDetails/UpdateDoctorDetails`,
            method: 'post',
            data: updatedDoctor,
            port: 49836,
        }).then((res) => setSelectedDoctor(updatedDoctor));

    }
    return (
        <div>
            <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    <Typography variant="h5" component="h2">
                        {selectedDoctor.firstName}   {selectedDoctor.lastName}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h5" component="h2">
                        Age : {selectedDoctor.age} Gender : {selectedDoctor.gender}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Degree : {selectedDoctor.degree} Speciality : {selectedDoctor.speciality}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Rating : {selectedDoctor.rating} Tariff : {selectedDoctor.tariff}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleRatingButton} color="primary">
                        Rate Doctor
                    </Button>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={onChangeRating}
                    />
                    <Button autoFocus onClick={handleScheduleButton} color="primary">
                        Schedule Appointment
                        </Button>
                </DialogActions>
                {alert && (<Alert severity="info">You need to be logged in to access this!</Alert>)}
            </Dialog>

        </div>
    );
}

export default ViewDoctorDetails;