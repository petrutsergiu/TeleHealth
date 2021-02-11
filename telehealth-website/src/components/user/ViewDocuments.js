import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import request from '../../helpers/request';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import UploadFile from './UploadFile'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ViewDocuments = (props) => {

    const classes = useStyles();
    let urlPath = 'https://localhost:44383/'
    const [documents, setDocuments] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        request({
            url: 'Consultance/GetUserDocuments',
            method: 'get',
            port: 60717,
        }).then((res) => {
            setDocuments(res.content);
            setIsLoading(true);
        });
    },[]);

    return isLoading && documents ?
        (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Document Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Upload Date</TableCell>
                                <TableCell align="right">Uploaded By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.fileName}>
                                    <TableCell component="th" scope="row">
                                        <Link href={urlPath + doc.staticFilePath} target="_blank" rel="noopener" rel="noreferrer" download>{doc.fileName}</Link>
                                    </TableCell>
                                    <TableCell align="right">{doc.description}</TableCell>
                                    <TableCell align="right">{doc.uploadDate}</TableCell>
                                    <TableCell align="right">{doc.mongoUserId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <UploadFile setDocuments={setDocuments} setIsLoading={setIsLoading}  />
            </div>
        )
        :
        (
            <UploadFile setDocuments={setDocuments} setIsLoading={setIsLoading} />
        )
}

export default ViewDocuments