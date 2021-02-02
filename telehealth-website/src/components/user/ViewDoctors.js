import Card from '@material-ui/core/Card';
import React, { useState, useEffect } from 'react';
import request from '../../helpers/request';
import SchedulerComponent from '../scheduler/SchedulerComponent';

const ViewDoctors = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState();
    const handleCardOnClick = (e) =>{
        console.log('click on card');
        const clickedId = e.currentTarget.id;
        console.log(clickedId);
        const doctor = doctors.find((item) =>{
            return item.id === clickedId;
        });
        console.log(doctor);
        setSelectedDoctor(doctor);
    }

    useEffect(() => {
        request({
            url: `UserDetails/GetAllDoctors`,
            method: 'get',
            port : 49836,
        }).then((res) => setDoctors(res.content));
        console.log(doctors)
    }, []);

    return (
        <div>
            {doctors && doctors.map((item, index) => (
                <Card key={index} id={item.id} onClick={handleCardOnClick} >
                    {item.firstName} {item.lastName}
                    <br />
                   Age {item.age}  Gender {item.gender}  YearsOfExperience {item.yearsExperience}
                    <br />
                    {item.speciality}
                </Card>
            ))}
            { selectedDoctor && (<SchedulerComponent selectedDoctor={selectedDoctor}/>)} 
        </div>
    )
}

export default ViewDoctors