import { useEffect, useState } from "react";
import api from "../../services/api"


import { Button, Card, Container, Grid, Modal, Box, Typography } from "@mui/material";
import Calendar from "./Calendar";
import IconProvider from '../../components/IconProvider'
import FormMood from "./FormMood";
import Notes from "./Notes";

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
    const [notes, setNotes] = useState([])
    //
    const [isLoading, setLoading ] = useState()
    const [error, setError] = useState()
    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        getNotes()
    },[])

    function getNotes(){
        setLoading(true)
        api.get(`/moodtracker/${sessionStorage.getItem('secret')}`).then(
            response => {
                setLoading(false)
                setNotes(response.data)
            },
            response => {
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
                        <Typography variant="h6"><IconProvider icon={'mingcute:moon-stars-line'} sx={{mx: 2}}/>Mood Tracker</Typography>
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
                    alignItems="center"
                    sx={{p:3}}
                >

                    <Grid xs={8}>
                        <Card>
                            {notes.map((note)=>(
                                <Notes note={note}/>
                            ))}
                        </Card>
                    </Grid>

                    <Grid>
                        <Card>
                            <Calendar/>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
}