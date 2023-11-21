import { useEffect, useState } from "react";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider";

import { Backdrop, Button, Card, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import api from "../../services/api";

//----------------------------------------------------------------

export default function Habits({ date , name, complete, _id }){
    const [isLoading, setLoading ] = useState(false)
    const [error, setError ] = useState(false)
    const [status, setStatus] = useState(complete)
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

                <Grid container>

                    <Grid item>
                        <Grid container>
                            
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button startIcon={<IconProvider icon={'mingcute:task-line'}/>} sx={{bgcolor: '#F5F1FF'}}>
                            Completar
                        </Button>
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