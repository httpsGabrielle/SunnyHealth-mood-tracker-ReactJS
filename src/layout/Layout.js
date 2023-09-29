import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { Grid } from "@mui/material";

//components
import Menu from './menu'

// ----------------------------------------------------------------

export default function Layout(){

    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage.getItem('auth')){
            navigate('/login')
        }
    }, [])

    return(
        <Grid container sx={{minWidth: '100%'}} columnSpacing={3} >
            <Menu/>
            <Grid xs sx={{p: 3}}>
                <Outlet/>
            </Grid>
        </Grid>
    )
}