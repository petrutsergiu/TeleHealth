import Card from '@material-ui/core/Card';
import React, { useState, useEffect } from 'react';
import request from '../../helpers/request';

const ViewDoctors = (props) => {

    const [doctors, setDoctors] = useState([]);

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
                <Card >
                    {item.firstName} {item.lastName}
                    <br />
                   Age {item.age}  Gender {item.gender}  YearsOfExperience {item.yearsExperience}
                    <br />
                    {item.speciality}
                </Card>
            ))}
        </div>
    )
}

export default ViewDoctors