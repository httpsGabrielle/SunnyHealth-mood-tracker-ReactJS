import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../services/api"

import Calendar from "./Calendar";
import IconProvider from '../../components/IconProvider'
import FormMood from "./FormMood";
import Notes from "./Notes";

import { Button, Card, Container, Grid, Modal, Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import secureLocalStorage from "react-secure-storage";

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

export default function MoodTracker(){
    const { create } = useParams()

    const [notes, setNotes] = useState([])
    //
    const [isLoading, setLoading ] = useState(false)

    const [error, setError] = useState()
    //
    const [open, setOpen] = useState(create === 'create' ? true : false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const [dateList, setDateList] = useState([])

    useEffect(()=>{
        getNotes()
    },[])

    function getNotes(){
        setLoading(true)
        api.get(`/moodtracker/${secureLocalStorage.getItem('secret')}`).then(
            response => {
                setLoading(false)
                setNotes(response.data)
                const dates = response.data.map((d)=>(
                    new Date(d.createdAt).getDate()
                ))
                console.log(dates)
                setDateList(dates)
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
                        <Typography variant="h6"><IconProvider icon={'mingcute:moon-stars-line'} sx={{mx: 2}}/>Diário</Typography>
                    </Grid>
                    <Grid>
                        <Button onClick={handleOpen} variant="contained">
                            <IconProvider icon={'heroicons-solid:plus-sm'} sx={{me: 2}}/>
                            Add Diário
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
                                    <Typography variant="h6">{new Date().toLocaleDateString("pt-BR", {weekday: "short",year: "numeric",month: "long",day: "numeric"})}</Typography>
                                    <Button variant="fill"><IconProvider icon={'mingcute:close-fill'} onClick={handleClose}/></Button>
                                </Grid>
                                <FormMood/>
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
                >

                    <Grid xs={8}>
                        {notes.map((note)=>(
                            <Notes note={note}/>
                        ))}
                    </Grid>

                    <Grid>
                        <Card>
                            <Calendar dataProps={dateList}/>
                        </Card>
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