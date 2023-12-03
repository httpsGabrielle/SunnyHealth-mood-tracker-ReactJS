import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { Badge, Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";

//components
import IconProvider from "../../../components/IconProvider";

import { grey } from "@mui/material/colors";

import secureLocalStorage from "react-secure-storage";
import api from "../../../services/api";

// ----------------------------------------------------------------

export default function NotificationButton(){

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
        const updateNotification = [{
            read: true
        }]
        api.patch(`/notify/${id}`, updateNotification)
        .then(
            response =>{
                navigate(response.data.link)
            }
        )
    };

    function getNotification(){
        api.get(`/notify/${secureLocalStorage.getItem('secret')}?read=false&trigger=true`)
        .then(
            response =>{
                setNotifications(response.data)
            }
        )
    }

    return(
        <>
            <Badge badgeContent={notifications.length} color="primary" overlap="circular">
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
                            <IconButton sx={{backgroundColor: '#E3DBF0', color: notification.icon.color, p: 1, borderRadius: 1, mr: 2}} >
                                <IconProvider icon={notification.icon.name} />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h6">{notification.title}</Typography>
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
        </>
    )
}