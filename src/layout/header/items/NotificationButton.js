import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { Backdrop, Badge, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";

//components
import IconProvider from "../../../components/IconProvider";

import { grey } from "@mui/material/colors";

import secureLocalStorage from "react-secure-storage";
import api from "../../../services/api";

// ----------------------------------------------------------------

export default function NotificationButton(){
    const [isLoading, setLoading ] = useState(false)

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    const [notifications, setNotifications] = useState([])

    useEffect(()=>{
        getNotification()
    }, [])

    const handleUpdateNotify = (id) => {
        setLoading(true)
        const updateNotification = [{
            read: true
        }]
        api.patch(`/notify/${id}`, updateNotification)
        .then(
            response =>{
                setLoading(false)
                getNotification()
                navigate(response.data.link)
            }
        )
    };

    function getNotification(){
        api.get(`/notify/${secureLocalStorage.getItem('secret')}?read=false&trigger=true`)
        .then(
            response =>{
                setNotifications(response.data)
                console.log(response.data)
            }
        )
    }

    return(
        <>
            <Badge badgeContent={notifications.length} color="primary" overlap="circular" onClick={e=>{getNotification()}}>
                <IconButton sx={{ borderColor: grey[100], boxShadow: 1}} onClick={handleClick} >
                    <IconProvider icon={'mingcute:notification-line'}/>
                </IconButton>
            </Badge>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{width:800}}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.10))',
                        minWidth: 300,
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
            >
                {notifications.length > 0 ? notifications.map((notification) =>(
                    <MenuItem onClick={e=>{handleUpdateNotify(notification._id)}}>
                        <ListItemIcon>
                            <IconButton sx={{ color: notification.icon.color, p: 1}} onClick={e=>{handleUpdateNotify(notification._id)}}>
                                <IconProvider icon={notification.icon.name} />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="bold">{notification.title}</Typography>
                            <br/>
                            <Typography variant="widgetsubtitle">{notification.text}</Typography>
                        </ListItemText>
                    </MenuItem>
                )) : 
                    <MenuItem onClick={handleClose} sx={{color: grey[400]}}>
                        <ListItemIcon>
                            <IconProvider icon={'mingcute:broom-line'} />
                        </ListItemIcon>
                        <Typography>Tudo limpo por aqui</Typography>
                    </MenuItem>
                }
            </Menu>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}