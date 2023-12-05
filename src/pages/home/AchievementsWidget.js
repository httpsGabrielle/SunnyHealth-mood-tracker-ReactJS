import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Icon  from './../../components/assets/avatar/icon.svg'
 
import { Box, Card, Grid, Typography } from "@mui/material";

import Miniature from "../../components/assets/avatar/Miniature";

import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";

//----------------------------------------------------------------

export default function Achievements(){

    const navigate = useNavigate()

    const [user, setUser] = useState([]) 

    useEffect(()=>{
        api.get(`/usuario/${secureLocalStorage.getItem('secret')}`)
        .then(
            response => {
                setUser(response.data)
            }
        )
    }, [])

    return (
        <>
            <Card sx={{height: '100%', p: 3}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    onClick={e=> {navigate('/profile')}}
                >
                    <Typography sx={{p:1}}>Perfil</Typography>
                    <Miniature color={user}/>
                </Grid>
            </Card>
        </>
    )
}