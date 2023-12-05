import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Icon  from './../../components/assets/avatar/icon.svg'
 
import { Box, Card, Grid, Typography } from "@mui/material";

//----------------------------------------------------------------

export default function Achievements(){

    const navigate = useNavigate()

    const [user, setUser] = useState([]) 

    useEffect(()=>{

    }, [])

    return (
        <>
            <Card sx={{height: '100%', p: 3}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography sx={{p:1}}>Perfil</Typography>
                    <Box
                        component="img"
                        sx={{
                            height: 150
                        }}
                        alt="Avatar Icon."
                        src={Icon}
                        onClick={e=> {navigate('/profile')}}
                    />
                </Grid>
            </Card>
        </>
    )
}