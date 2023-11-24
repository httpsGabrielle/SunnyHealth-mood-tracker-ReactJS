import { useEffect, useState } from "react";

import api from "../../services/api"

import { Button, Card, Container, Grid, Modal, Box, Typography, Backdrop, CircularProgress } from "@mui/material";

import IconProvider from '../../components/IconProvider'

import FormHabits from './Form'
import Habits from "./Habits";
import PieCharts from "../../components/chats/PieCharts"

// ----------------------------------------------------------------

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    p: 3,
};

// ----------------------------------------------------------------

export default function HabitsList(){
    const [habitsList, setHabitsList] = useState([])
    //
    const [isLoading, setLoading ] = useState(false)
    const [error, setError] = useState()
    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        getHabitsList()
    },[])

    function getHabitsList(){
        setLoading(true)
        api.get(`/habits/${sessionStorage.getItem('secret')}`).then(
            response => {
                setLoading(false)
                setHabitsList(response.data.habits)
            },
            response => {
                setLoading(false)
                setError(response.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        )
    }

    return (
        <>
            <Container>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{p:3}}
                >

                    <Grid>
                        <Typography variant="h6"><IconProvider icon={'mingcute:flower-4-fill'} sx={{mx: 2}}/>Hábitos</Typography>
                    </Grid>

                    <Grid>
                        <Button onClick={handleOpen} variant="contained">
                            <IconProvider icon={'heroicons-solid:plus-sm'} sx={{me: 2}}/>
                            Novo Hábito
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Card sx={style}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{py: 2}}
                                >
                                    <Typography variant="h1">Novo Hábito</Typography>
                                    <Button variant="fill"><IconProvider icon={'mingcute:close-fill'} onClick={handleClose}/></Button>
                                </Grid>
                                <FormHabits/>
                            </Card>
                        </Modal>
                    </Grid>

                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{p:3}}
                    spacing={3}
                >

                    <Grid item xs={12} lg={8}>
                        {habitsList.map((habit)=>(
                            <Habits _id={habit._id} data={habit}/>
                        ))}
                    </Grid>

                </Grid>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Container>
        </>
    )
}