import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import request from '../../helpers/request';
import { TextareaAutosize } from '@material-ui/core';

const UploadFiles = (props) => {
    const [file, setDoc] = useState();
    const [fileDescription, setFileDesc] = useState('');

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', file);
        data.append('description', fileDescription);
        console.log(data);
        request({
            url: 'Consultance/UploadFiles',
            method: 'post',
            data: data,
            port: 60717,
        })
    }

    const handleChange = (setter) => (e) => {
        console.log(e.target.files);
        setter(e.target.files[0]);
        console.log(file);
    }

    const onTextChange = event => {
        setFileDesc(event.target.value);
    }

    return (
        <div>
            <label>
                Please select file to upload and add a description for it
            </label>
            <TextareaAutosize aria-label="minimum height" rowsMin={3} onChange={onTextChange} />
            <input type="file" name="doc" onChange={handleChange(setDoc)} />
            <Button
                color='primary'
                type='submit' onClick={onClickHandler}>
                Upload
            </Button>
        </div>
    )
}

export default UploadFiles;