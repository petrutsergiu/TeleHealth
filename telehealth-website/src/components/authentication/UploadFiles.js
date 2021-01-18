import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import request from '../../helpers/request';

const UploadFiles = (props) => {
    const [files,setFiles] = useState();

    const onClickHandler = () => {
        const data = new FormData()
        for (var x = 0; x < files.length; x++) {
            data.append('files', files[x]);
        }
         request({
            url:'Consultance/UploadFiles',
            method:'post',
            data:data,
            port : 60717,
        }) 
    }

    const onChangeHandler = event => {
        setFiles(event.target.files);
        console.log(files);
    }

    return (
        <div>
            <input type="file" name="file" multiple onChange={onChangeHandler} />
            <Button
                color='primary'
                type='submit' onClick={onClickHandler}>
                Upload
            </Button>
        </div>
    )
}

export default UploadFiles;