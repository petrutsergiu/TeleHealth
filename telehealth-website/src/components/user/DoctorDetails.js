import React, { useState } from 'react';
import request from '../../helpers/request';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";

const DoctorDetails = (props) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [location, setLocation] = useState();
    const [gender, setGender] = useState();
    const [language, setLanguage] = useState();
    const [yearsExperience, setYearsExperience] = useState();
    const [degree, setDegree] = useState();
    const [certificates, setCertificates] = useState();
    const [speciality, setSpeciality] = useState();
    const [tariffs, setTariffs] = useState();
    const [nationality, setNationality] = useState();

    const history = useHistory();


    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    }

    const handleClick = (e, ...params) => {
        e.preventDefault();
        const doctorDetails = { firstName, lastName, email, age: parseInt(age), location, gender, language,
            yearsExperience : parseFloat(yearsExperience) ,degree,certificates,speciality, tariffs, nationality};
        console.log('doctorDetails:', doctorDetails);
        request({
            url: `UserDetails/SaveDoctorDetails`,
            method: 'post',
            data: doctorDetails,
            port : 49836,
        }).then(() => history.push('/'))
    }


    return (
        <div>
            <label>Doctor</label>
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
                <TextField
                    type='text'
                    name='yearsExperience'
                    label='YearsExperience'
                    fullWidth
                    required
                    value={yearsExperience}
                    onChange={handleChange(setYearsExperience)}
                />
                <TextField
                    type='text'
                    name='degree'
                    label='Degree'
                    fullWidth
                    required
                    value={degree}
                    onChange={handleChange(setDegree)}
                />
                <TextField
                    type='text'
                    name='certificates'
                    label='Certificates'
                    fullWidth
                    required
                    value={certificates}
                    onChange={handleChange(setCertificates)}
                />
                <label>Speciality</label>
                <Select
                    labelId="specialitySelectLabel"
                    id="specialitySelect"
                    value={speciality}
                    required
                    onChange={handleChange(setSpeciality)}>
                    <MenuItem value={'GeneralDoctor'}>GeneralDoctor</MenuItem>
                    <MenuItem value={'Pediatrics'}>Pediatrics</MenuItem>
                </Select>
                <TextField
                    type='text'
                    name='tariffs'
                    label='Tariffs'
                    fullWidth
                    required
                    value={tariffs}
                    onChange={handleChange(setTariffs)}
                />
                <TextField
                    type='text'
                    name='nationality'
                    label='Nationality'
                    fullWidth
                    required
                    value={nationality}
                    onChange={handleChange(setNationality)}
                />
                <Button
                    color='primary'
                    type='submit'>
                    Save
            </Button>
            </form>
        </div>
    )
}

export default DoctorDetails;