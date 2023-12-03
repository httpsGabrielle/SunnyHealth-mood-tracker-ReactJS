import { useEffect, useState } from "react";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider";

import { Backdrop, Button, Card, Modal, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";

import api from "../../services/api";

import Form from './Form'

//----------------------------------------------------------------

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
export default function Habits({ _id , data}){
    const [isLoading, setLoading ] = useState(false)

    const [error, setError ] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    const handleCloseModal = () => {
        setOpenModal(false)
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = () => {
        setLoading(true)
        api.delete(`/habit/${_id}`)
            .then(
                response =>{
                    window.location.reload();
                },
                err =>{
                    setLoading(false);
                }
            )
    };

    return  (
        <>
            <Card sx={{p: 3, mb: 3, border: 1, borderColor: data.icon.color}}>

                <Grid container sx={{justifyContent: 'space-between', alignItems: "center"}}>

                    <Grid item>
                        <Grid container sx={{alignItems: "center"}}>
                            <IconButton sx={{p: 1, pr: 3}}>
                                <IconProvider icon={data.icon.name} sx={{color: data.icon.color}}/>
                            </IconButton>
                            {data.name}
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button startIcon={<IconProvider icon={'mingcute:task-line'}/>} sx={{bgcolor: '#F5F1FF', mr:2}}>
                            Completar
                        </Button>
                        <IconButton
                            onClick={handleClick}
                        >
                            <IconProvider icon={'charm:menu-kebab'}/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleOpenModal}><IconProvider icon={'tabler:edit'} sx={{mr: 2}}/> Editar</MenuItem>
                            <MenuItem onClick={handleDelete}><IconProvider icon={'prime:trash'} sx={{mr: 2}}/> Excluir</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Card>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                        <Button variant="fill" onClick={handleCloseModal}><IconProvider icon={'mingcute:close-fill'} /></Button>
                    </Grid>
                    <Form name={data.name} iconProps={data.icon}/>
                </Card>
            </Modal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}