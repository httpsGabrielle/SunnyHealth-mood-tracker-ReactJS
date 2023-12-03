import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// mui 
import { Grid } from "@mui/material";

//components
import Menu from './menu'
import Header from "./header";
import secureLocalStorage from "react-secure-storage";

// ----------------------------------------------------------------

export default function Layout(){

    const navigate = useNavigate()

    useEffect(()=>{
        if(!secureLocalStorage.getItem('auth')){
            navigate('/login')
        }
    }, [])

    return(
        <Grid container sx={{minWidth: '100%'}} columnSpacing={3} >
            <Menu/>
            <Grid xs sx={{p: 3}}>
                <Header/>
                <Outlet/>
            </Grid>
        </Grid>
    )
}