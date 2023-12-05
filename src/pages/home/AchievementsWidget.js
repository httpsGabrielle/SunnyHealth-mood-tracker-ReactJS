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

    const [color, setColor] = useState()

    const [secondary, setSecondary] = useState()

    const [pattern, setPattern] = useState()

    const [tail, setTail] = useState()

    useEffect(()=>{
        getProfile()
    }, [])

    function getProfile(){ 
        api.get(`/usuario/${secureLocalStorage.getItem('secret')}`)
        .then(
            response => {
                console.log(response.data)
                setColor(response.data.avatar.color_01)
                setSecondary(response.data.avatar.color_02)
                setPattern(response.data.avatar.pattern)
                setTail(response.data.avatar.tail)
            }
        )
    }

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
                    <Miniature color={color} secondary={secondary} pattern={pattern} tail={tail}/>
                </Grid>
            </Card>
        </>
    )
}