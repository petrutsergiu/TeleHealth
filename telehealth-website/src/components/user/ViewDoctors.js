import Card from '@material-ui/core/Card';
import React, { useState, useEffect } from 'react';
import request from '../../helpers/request';
import SchedulerComponent from '../scheduler/SchedulerComponent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red, blue, green } from '@material-ui/core/colors';
import ViewDoctorDetails from './ViewDoctorDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: blue[500],
    },
}));

const ViewDoctors = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState();
    const classes = useStyles();

    const handleCardOnClick = (e) => {
        const clickedId = e.currentTarget.id;
        const doctor = doctors.find((item) => {
            return item.id === clickedId;
        });
        setSelectedDoctor(doctor);
    }

    useEffect(() => {
        request({
            url: `UserDetails/GetAllDoctors`,
            method: 'get',
            port: 49836,
        }).then((res) => setDoctors(res.content));
        console.log(doctors)
    }, []);

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {doctors && doctors.map((item, index) => (
                            <Grid key={index} item>

                                <Card key={index} id={item.id} onClick={handleCardOnClick} className={classes.avatar} >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                MD
                                       </Avatar>
                                        }
                                        title={item.firstName}
                                        subheader={item.lastName}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Age {item.age}    Gender {item.gender}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.speciality}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            { selectedDoctor && (<ViewDoctorDetails selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />)}
        </div>
    )
}

export default ViewDoctors