import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { Divider, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

//components
import IconProvider from "../../components/IconProvider";
import { grey } from "@mui/material/colors";
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
                    <IconButton sx={{ borderColor: grey[100], boxShadow: 1}}>
                        <IconProvider icon={'mingcute:notification-line'}/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton sx={{ borderColor: grey[100], boxShadow: 1}} onClick={handleClick} >
                        <IconProvider icon={'mingcute:settings-3-line'}/>
                    </IconButton>
                </Grid>
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
                          width: 200,
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Conquistas</MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>Termos e condições</MenuItem>
                    <MenuItem onClick={handleClose}>Configuração</MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <IconProvider icon={'material-symbols:logout-rounded'}/>
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}