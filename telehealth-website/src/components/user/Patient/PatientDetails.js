import React, { useState } from 'react';
import request from '../../../helpers/request';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";

const PatientDetails = () => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [location, setLocation] = useState();
    const [gender, setGender] = useState();
    const [language, setLanguage] = useState();
    const history = useHistory();

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    }

    const handleClick = (e, ...params) => {
        e.preventDefault();
        const patientDetails = { firstName, lastName, email, age: parseInt(age), location, gender, language };
        request({
            url: `UserDetails/SavePatientDetails`,
            method: 'post',
            data: patientDetails,
            port: 49836,
        }).then(() => history.push('/'));
    }

    return (
        <div>
            <label>Patient</label>
            <form onSubmit={handleClick}>
                <TextField
                    type='text'
                    name='firstName'
                    label='Firstname'
                    fullWidth
                    required
                    value={firstName}
                    onChange={handleChange(setFirstName)}
                />
                <TextField
                    type='text'
                    name='lastName'
                    label='LastName'
                    fullWidth
                    required
                    value={lastName}
                    onChange={handleChange(setLastName)}
                />
                <TextField
                    type='text'
                    name='email'
                    label='Email'
                    fullWidth
                    required
                    value={email}
                    onChange={handleChange(setEmail)}
                />
                <TextField
                    type='text'
                    name='age'
                    label='Age'
                    fullWidth
                    required
                    value={age}
                    onChange={handleChange(setAge)}
                />
                <TextField
                    type='text'
                    name='location'
                    label='Location'
                    fullWidth
                    required
                    value={location}
                    onChange={handleChange(setLocation)}
                />
                <label>Gender</label>
                <Select
                    labelId="genderSelectLabel"
                    id="genderSelect"
                    value={gender}
                    required
                    onChange={handleChange(setGender)}>
                    <MenuItem value={'M'}>Male</MenuItem>
                    <MenuItem value={'F'}>Female</MenuItem>
                </Select>
                <label>Language</label>
                <Select
                    labelId="languageSelectLabel"
                    id="languageSelect"
                    value={language}
                    required
                    onChange={handleChange(setLanguage)}>
                    <MenuItem value={'RO'}>Romana</MenuItem>
                    <MenuItem value={'EN'}>English</MenuItem>
                </Select>
                <Button
                    color='primary'
                    type='submit'>
                    Save
            </Button>
            </form>
        </div>
    )

}

export default PatientDetails;