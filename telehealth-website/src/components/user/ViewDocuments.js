import React, { useState, useEffect } from 'react';
import request from '../../helpers/request';
import ListItem from '@material-ui/core/ListItem';
import { TextareaAutosize } from '@material-ui/core';

const ViewDocuments = (props) => {

    let urlPath = 'https://localhost:44383/'
    let user = props.user;
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        request({
            url: 'Consultance/GetUserDocuments',
            method: 'get',
            port: 60717,
        }).then((res) => setDocuments(res.content));
        console.log(documents)
    }, []);

    return (
        <div>
            {documents.map((item, index) => (
                <ListItem>
                    <div>
                        <form>
                        <label>File </label>
                        <a href={urlPath + item.staticFilePath}>{item.fileName}</a>
                        <label>Description </label>
                        <TextareaAutosize value={item.description} />
                        <label>Uploaded </label>
                        {item.uploadDate}
                        </form>
                    </div>
                </ListItem>
            ))}
        </div>
    )
}

export default ViewDocuments