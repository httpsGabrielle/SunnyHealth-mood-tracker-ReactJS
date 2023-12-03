import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { grey } from "@mui/material/colors";

import { Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

//components
import IconProvider from "../../components/IconProvider";

import SettingsButton from "./items/SettingsButton";

import NotificationButton from "./items/NotificationButton";

import secureLocalStorage from "react-secure-storage";

// ----------------------------------------------------------------

export default function Header(){

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        secureLocalStorage.clear()
        navigate('/login')
    };

    return(
        <Grid item xs={10}>
            <Grid container sx={{justifyContent: 'end'}} spacing={1}>
                <Grid item>
                    <NotificationButton/>
                </Grid>
                <Grid item>
                    <SettingsButton />
                </Grid>
            </Grid>
        </Grid>
    )
}