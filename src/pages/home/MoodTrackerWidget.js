
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import IconProvider from '../../components/IconProvider' 

import { blue, yellow, lightGreen, deepPurple, pink } from '@mui/material/colors';
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import secureLocalStorage from "react-secure-storage";

// ----------------------------------------------------------------

export default function MoodTrackerWidget(){
    const navigate = useNavigate()

    const [moodList, setMoodList] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getNotes()
    },[])

    function getNotes(){
        setLoading(true)
        api.get(`/moodtracker/${secureLocalStorage.getItem('secret')}?limit=4`).then(
            response => {
                setLoading(false)
                const moodList = response.data.map((list)=>({
                    color: list.mood === 'triste' ? blue['100'] : list.mood === 'feliz' ? yellow['200'] : list.mood === 'OK' ? lightGreen['200'] : list.mood === 'fantastico' ? deepPurple['100'] : pink['50'],
                    icon: list.mood === 'triste' ? 'noto-v1:crying-cat-face' : list.mood === 'feliz' ? 'noto-v1:grinning-cat-face' : list.mood === 'OK' ? 'noto-v1:cat' : list.mood === 'fantastico' ? 'noto-v1:grinning-cat-with-smiling-eyes' : 'noto-v1:weary-cat',
                    date: new Date(list.createdAt),
                    mood: list.mood
                }))
                console.log(response.data)
                setMoodList(moodList)
            },
            response => {
                setLoading(false)
            }
        )
    }

    return (
        <>
            <Card sx={{p: 2}}>
                <Typography variant="h1">Bem vindo, {secureLocalStorage.getItem('nickname')}!</Typography>
                <Typography variant="subtitle1">Como está se sentindo hoje?</Typography>
                <Grid container spacing={3} sx={{mt: 1}}>
                    <Grid item>
                        <Box
                            sx={{
                            width: 110,
                            height: 120,
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.100',
                            '&:hover': {
                                bgcolor: 'grey.200',
                            },
                            }}
                            onClick={e=>{navigate('/mood-tracker/create')}}
                        >
                            <IconProvider sx={{mb: 1}} icon={'mingcute:add-circle-fill'}/>
                            <Typography variant="button"> Registrar </Typography>
                        </Box>
                    </Grid>
                    {moodList.map((mood)=>(
                        <>
                            <Grid item>
                                <Box
                                    sx={{
                                    width: 110,
                                    height: 120,
                                    borderRadius: 1,
                                    p: 1,
                                    bgcolor: mood.color,
                                    }}
                                >
                                    <Grid 
                                        container
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <IconProvider icon={mood.icon}/>
                                        <Grid item>
                                            <Typography variant="subtitle2">{mood.date.toLocaleString('default',{month: 'short'})}</Typography>
                                            <Typography variant="h2">{mood.date.getDay()}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="widgetsubtitle">Se sentindo</Typography>
                                            <Typography variant="h2" sx={{textTransform: 'capitalize'}}>{mood.mood}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Card>
        </>
    )
}