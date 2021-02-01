import React, { useState, useEffect } from 'react';
import request from '../../helpers/request';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WelcomePage from './WelcomePage';
import { Formik } from 'formik';


const DoctorDetails = (props) => {

    const [id, setId] = useState();
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
    const { onSave } = props;

    const [initialValues, setInitialValues] = useState({
        firstName: '', lastName: '', email: '', age: '', location: '', gender: '', language: '', yearsExperience: '', degree: '', certificates: '',
        speciality: '', tariffs: '', nationality: ''
    })
    const [loading, isLoading] = useState(false);

    const handleChange = (e, setFieldValue) => {
        console.log(e.target.name);
        setFieldValue(e.target.name, e.target.value, false);
        setInitialValues({ ...initialValues, [`${e.target.name}`]: `${e.target.value}` });
    }

    const handleClick = (e, ...params) => {
        e.preventDefault();
        const doctorDetails = {
            id, firstName, lastName, email, age: parseInt(age), location, gender, language,
            yearsExperience: parseFloat(yearsExperience), degree, certificates, speciality, tariffs, nationality
        };
        console.log('doctorDetails:', doctorDetails);

        if (!id) {
            request({
                url: `UserDetails/SaveDoctorDetails`,
                method: 'post',
                data: doctorDetails,
                port: 49836,
            }).then(() => onSave('y'));
        }
        else {
            request({
                url: `UserDetails/UpdateDoctorDetails`,
                method: 'post',
                data: doctorDetails,
                port: 49836,
            }).then(() => onSave('y'));
        }
    }

    useEffect(() => {
        isLoading(true);
        if (!id) {
            request({
                url: 'UserDetails/GetDoctorDetails',
                method: 'get',
                port: 49836,
            }).then((res) => {
                setInitialValues({
                    id: res.content.id,
                    firstName: res.content.firstName, lastName: res.content.lastName, email: res.content.email, age: res.content.age
                    , location: res.content.location, gender: res.content.gender, language: res.content.language, yearsExperience: res.content.yearsExperience, degree: res.content.degree
                    , certificates: res.content.certificates, speciality: res.content.speciality, tariffs: res.content.tariffs, nationality: res.content.nationality
                })
                console.log(res.content);
            });
        }
        isLoading(false);
    }, []);



    return !loading ? (
        <div>
            <label>Doctor</label>
            <Formik
                initialValues={initialValues}
                onSubmit={handleClick}
                render={({ values, setFieldValue }) => {
                    console.log(initialValues);
                    return (
                        <form>
                            <TextField
                                type='text'
                                name='firstName'
                                label='Firstname'
                                fullWidth
                                required
                                value={initialValues.firstName ?? values.firstName}
                                onChange={e => handleChange(e, setFieldValue)}
                            />
                            <TextField
                                type='text'
                                name='lastName'
                                label='LastName'
                                fullWidth
                                required
                                value={initialValues.lastName ?? values.firstName}
                                onChange={e => handleChange(e, setFieldValue)}
                            />
                            <TextField
                                type='text'
                                name='email'
                                label='Email'
                                fullWidth
                                required
                                value={initialValues.email ?? values.email}
                                onChange={e => handleChange(e, setFieldValue)}
                            />
                            <TextField
                                type='text'
                                name='age'
                                label='Age'
                                fullWidth
                                required
                                value={initialValues.age ?? values.age}
                                onChange={e => handleChange(e, setFieldValue)}
                            />
                            <TextField
                                type='text'
                                name='location'
                                label='Location'
                                fullWidth
                                required
                                value={initialValues.location ?? values.location}
                                onChange={e => handleChange(e, setFieldValue)}
                            />
                            <label>Gender</label>
                            <Select
                                labelId="genderSelectLabel"
                                id="genderSelect"
                                required
                                value={initialValues.gender ?? values.gender}
                                onChange={e => handleChange(e, setFieldValue)}
                            >
                                <MenuItem value={'M'}>Male</MenuItem>
                                <MenuItem value={'F'}>Female</MenuItem>
                            </Select>
                            <label>Language</label>
                            <Select
                                labelId="languageSelectLabel"
                                id="languageSelect"
                                required
                                value={initialValues.language ?? values.language}
                                onChange={e => handleChange(e, setFieldValue)}
                            >
                                <MenuItem value={'RO'}>Romana</MenuItem>
                                <MenuItem value={'EN'}>English</MenuItem>
                            </Select>
                            <TextField
                                type='text'
                                name='yearsExperience'
                                label='YearsExperience'
                                fullWidth
                                required
                                value={initialValues.yearsExperience ?? values.yearsExperience}
                                onChange={e => handleChange(e, setFieldValue)}

                            />
                            <TextField
                                type='text'
                                name='degree'
                                label='Degree'
                                fullWidth
                                required
                                value={initialValues.degree ?? values.degree}
                                onChange={e => handleChange(e, setFieldValue)}

                            />
                            <TextField
                                type='text'
                                name='certificates'
                                label='Certificates'
                                fullWidth
                                required
                                value={initialValues.certificates ?? values.certificates}
                                onChange={e => handleChange(e, setFieldValue)}

                            />
                            <label>Speciality</label>
                            <Select
                                labelId="specialitySelectLabel"
                                id="specialitySelect"
                                required
                                value={initialValues.speciality ?? values.speciality}
                                onChange={e => handleChange(e, setFieldValue)}
                            >
                                <MenuItem value={'GeneralDoctor'}>GeneralDoctor</MenuItem>
                                <MenuItem value={'Pediatrics'}>Pediatrics</MenuItem>
                            </Select>
                            <TextField
                                type='text'
                                name='tariffs'
                                label='Tariffs'
                                fullWidth
                                required
                                value={initialValues.tariffs ?? values.tariffs}
                                onChange={e => handleChange(e, setFieldValue)}

                            />
                            <TextField
                                type='text'
                                name='nationality'
                                label='Nationality'
                                fullWidth
                                required
                                value={initialValues.nationality ?? values.nationality}

                                onChange={e => handleChange(e, setFieldValue)}

                            />
                            <Button
                                color='primary'
                                type='submit'>
                                Save
                            </Button>
                        </form>
                    )
                }}
            >

            </Formik>
        </div>
    ) : <></>
}

export default DoctorDetails;