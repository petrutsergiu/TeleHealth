import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useLoggedUserState } from '../../LoggedUser';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ViewDoctorAppointments from './ViewDoctorAppointments';

const DoctorWelcomePage = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const { user, setUser } = useLoggedUserState();
    const history = useHistory();
    const {doctor} = props;

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleProfileClose = () => {
        setAnchorEl(null);
    };
    const handleMyAccountClose = () => {
        setAnchorEl(null);
    };
    const handleLogOutClose = () => {
        setAnchorEl(null);
        setUser({});
    };
    return (
        <div>
            <Typography variant="h5" component="h2">
               WELCOME Doctor  {doctor.firstName}   {doctor.lastName}
            </Typography>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                <MenuItem onClick={handleMyAccountClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOutClose}>Logout</MenuItem>
            </Menu>

            <ViewDoctorAppointments/>
        </div>
    )
}

export default DoctorWelcomePage;