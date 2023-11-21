import { useEffect, useState } from "react";
import api from "../../services/api"

//
import IconProvider from "../../components/IconProvider";
import fantastic from '../../components/assets/moods/fantastic.jpg'
import happy from '../../components/assets/moods/happy.jpg'
import sad from '../../components/assets/moods/sad.jpg'
import tired from '../../components/assets/moods/tired.jpg'
import soso from '../../components/assets/moods/soso.jpg'

// mui
import { Card, Typography, Grid, Button, Box, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";

// ----------------------------------------------------------------
export default function FormTask({nameProps , dataProps , observationProps, _id }){
    const [isLoading, setLoading ] = useState()
    const [error, setError] = useState()
    //
    const [taskName, setTaskName] = useState(nameProps ?? '')
    const [date, setDate] = useState(dataProps ?? '')
    const [observation, setObservation] = useState(observationProps ?? '')

    function handleSave(){
        setLoading(true)
        const newtarefa = [{
            name: taskName,
            date: date['$d'],
            observation: observation,
            related_user: sessionStorage.getItem('secret')
        }]
        api.post('/task', newtarefa).then(
            response => {
                setLoading(false)
                window.location.reload()
            },
            err => {
                setLoading(false)
                setError(err.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        )
    }

    function handleUpdate(){
        setLoading(true)
        const upcommingtask = [{
            name: taskName,
            date: date['$d'],
            observation: observation,
        }]
        api.patch(`/task/${_id}`, upcommingtask).then(
            response => {
                setLoading(false)
                window.location.reload()
            },
            err => {
                setLoading(false)
                setError(err.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        )
    }

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Nome da tarefa</Typography>
                    <TextField variant="outlined" fullWidth multiline value={taskName} onChange={e=>{setTaskName(e.target.value)}}/>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Definir prazo</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <DateTimePicker
                                value={dayjs(date)}
                                onChange={(newValue) => setDate(newValue)}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </DemoContainer>
                        </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Observação</Typography>
                    <TextField variant="outlined" fullWidth multiline rows={4} value={observation} onChange={e=>{setObservation(e.target.value)}}/>
                </Grid>
                
                <Grid item>
                    {error ? 
                        <Alert variant="outlined" severity="error">
                            {error}
                        </Alert>
                    : ''}

                    <LoadingButton variant="contained" onClick={e=>{ _id != undefined ? handleUpdate() : handleSave()}} loading={isLoading}>
                        <IconProvider icon={'fluent:save-24-regular'} sx={{mr:2}}/>
                        Salvar
                    </LoadingButton>
                </Grid>
            </Grid>
        </>
    )
}