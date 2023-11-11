import { useEffect, useState } from "react";

import api from "../../services/api"

import IconProvider from '../../components/IconProvider'

import { Button, Card, Container, Grid, Modal, Box, Typography, Backdrop, CircularProgress } from "@mui/material";

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

export default function TasksList(){
    const [notes, setNotes] = useState([])
    //
    const [isLoading, setLoading ] = useState(false)
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
                    <Typography variant="h6"><IconProvider icon={'mingcute:list-check-2-fill'} sx={{mx: 2}}/>Tarefas</Typography>
                    

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