import { useEffect, useState } from "react";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider";

import { Backdrop, Button, Card, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import api from "../../services/api";

//----------------------------------------------------------------

export default function Habits({ _id , data}){
    const [isLoading, setLoading ] = useState(false)

    const [error, setError ] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = () => {

    };

    return  (
        <>
            <Card sx={{p: 3, mb: 3}}>

                <Grid container sx={{justifyContent: 'space-between'}}>

                    <Grid item>
                        <Grid container>
                            {data.name}
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button startIcon={<IconProvider icon={'mingcute:task-line'}/>} sx={{bgcolor: '#F5F1FF', mr:2}}>
                            Completar
                        </Button>
                        <IconButton
                            onClick={handleClick}
                        >
                            <IconProvider icon={'charm:menu-kebab'}/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClick}><IconProvider icon={'tabler:edit'} sx={{mr: 2}}/> Editar</MenuItem>
                            <MenuItem onClick={handleDelete}><IconProvider icon={'prime:trash'} sx={{mr: 2}}/> Excluir</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Card>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}