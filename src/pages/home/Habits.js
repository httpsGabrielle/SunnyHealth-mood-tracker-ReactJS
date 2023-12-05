
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

import api from "../../services/api";

import IconProvider from '../../components/IconProvider' 

import { blue, yellow, lightGreen, deepPurple, pink, grey, purple } from '@mui/material/colors';

import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, Menu, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------

export default function Habits(){
    const navigate = useNavigate()

    const [habitList, setHabitList] = useState([])

    useEffect(()=>{
        api.get(`/habits/${secureLocalStorage.getItem('secret')}`)
        .then(
            response => {
                setHabitList(response.data.habits)
            }
        )
    }, [])

    return (
        <>
            <Card 
                sx={{
                    p: 3,
                }}
            >
                <Grid item sx={{minHeight: '200px',}}>
                    <Box 
                        sx={{
                            bgcolor: purple['50'], 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 2
                        }}
                    >
                        <IconProvider icon={'lucide:cloud-sun'} sx={{mr: 2}}/> 
                        <Typography variant="subtitle2">QUALQUER HORA</Typography>
                    </Box>
                        <>
                            <Grid 
                                container 
                                direction="row"
                                alignItems="center"
                                columnSpacing={2}
                            >
                                {habitList.map((habit)=>(
                                    <>
                                        <Grid item xs={12} sx={{border: 1, borderRadius: 2, borderColor: grey['200'], p: 2, m:2 }}>
                                            <Grid 
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <IconProvider icon={habit.icon.name} sx={{mr: 3, color: habit.icon.color}}/>
                                                    {habit.name}
                                                </Grid>
                                                <Grid item>
                                                    <FormControlLabel control={<Checkbox value/>} label="Completar"/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </>
                </Grid>
                <Grid item>
                    <Button 
                        fullWidth
                        variant="outlined"
                        sx={{borderRadius: '100px', alignSelf: 'flex-end'}}
                        onClick={e=>{navigate('/habitos')}}
                    >
                        Novo hábito
                    </Button>
                </Grid>
            </Card> 
        </>
    );
}
