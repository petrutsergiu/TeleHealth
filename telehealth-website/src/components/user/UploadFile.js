import React, { useState } from 'react';
import request from '../../helpers/request';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize } from '@material-ui/core';

const UploadFiles = (props) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [fileDescription, setFileDescription] = useState();
    const {setDocuments,setIsLoading } = props;
    const handleSettingFile = (e) => {
        setFile(e.target.files[0]);
    }
    const onFileDescriptionChange = (e) => {
        setFileDescription(e.target.value);
    }

    const handleUploadButton = () => {
        const data = new FormData()
        data.append('file', file);
        data.append('description', fileDescription);
        console.log(data);
        request({
            url: 'Consultance/UploadFiles',
            method: 'post',
            data: data,
            port: 60717,
        }).then((res) => {
            setOpen(false);
            return res;
        }).then((res) => {
            if (res.status) {
                request({
                    url: 'Consultance/GetUserDocuments',
                    method: 'get',
                    port: 60717,
                }).then((res) => {
                    setDocuments(res.content);
                    setIsLoading(true);
                });
            }
        }) ;
    }

    const handleDialogClickOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Typography variant="h5" component="h2">
                To upload any documents, press the button.
                </Typography>
            <Button variant="outlined" color="primary" onClick={handleDialogClickOpen}>
                Upload Files
                 </Button>
            <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                    Document Upload
                    </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h5" component="h2">
                        Please select file to upload and add a description for it
                        </Typography>
                    <TextareaAutosize aria-label="minimum height" rowsMin={3} onChange={onFileDescriptionChange} />
                    <input type="file" name="doc" onChange={handleSettingFile} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleUploadButton} color="primary">
                        Upload
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UploadFiles;