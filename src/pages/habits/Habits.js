import { useEffect, useState } from "react";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider";

import { Backdrop, Button, Card, Modal, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography, Box, Alert } from "@mui/material";

import api from "../../services/api";

import Form from './Form'

import Conquista from "../../components/Conquista/Conquista";

import Calendar from "../../pages/moodtracker/Calendar";
import { LoadingButton } from "@mui/lab";

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
    const [loading, setLoading ] = useState(false)

    const [isLoading, setisLoading ] = useState(false)

    const [error, setError ] = useState(false)

    const [success, setSuccess ] = useState()

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const [openModal, setOpenModal] = useState(false)

    const [openDetails, setOpenDetails] = useState(false)

    const [dateList, setDateList] = useState([])


    useEffect(() => {
        const teste = data
        const datas = teste.days.map((d) => new Date(d).getDate());
        setDateList(datas);
    }, []);
    

    const handleOpenDetauils = () => {
        setOpenDetails(true)
    };

    const handleCloseDetauils = () => {
        setOpenDetails(false)
    };


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
        setisLoading(true)
        api.delete(`/habit/${_id}`)
            .then(
                response =>{
                    window.location.reload();
                },
                err =>{
                    setisLoading(false);
                }
            )
    };
    const handleComplete = () => {
        setLoading(true);
        const data = [{
            days: new Date('12/03/2023')
        }]
        api.patch(`/register/habit/${_id}`, data)
            .then(
                response =>{
                    setSuccess('Salvo com sucesso')
                    setLoading(false)
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
                            <Grid item>
                                <IconButton sx={{p: 1, pr: 3}}>
                                    <IconProvider icon={data.icon.name} sx={{color: data.icon.color}}/>
                                </IconButton>
                            </Grid>
                            
                            <Grid item>
                                <Typography>
                                    {data.name}
                                </Typography>
                                <Typography sx={{color: grey[300]}}>
                                    {data.days.length > 0 ? 
                                        new Date(data.days[data.days.length - 1]).toLocaleDateString('pt-br') !== new Date().toLocaleDateString('pt-br') !== 0 ? '' : 'Não concluído hoje'
                                    : 'Não concluído hoje'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <LoadingButton loading={loading} startIcon={<IconProvider icon={'mingcute:task-line'}/>} sx={{bgcolor: '#F5F1FF', mr:2}} onClick={e=>{handleComplete()}}>
                            Completar
                        </LoadingButton>
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
                            <MenuItem onClick={handleOpenDetauils}><IconProvider icon={'majesticons:calendar'} sx={{mr: 2}}/> Ver frequência</MenuItem>
                            <MenuItem onClick={handleOpenModal}><IconProvider icon={'tabler:edit'} sx={{mr: 2}}/> Editar</MenuItem>
                            <MenuItem onClick={handleDelete}><IconProvider icon={'prime:trash'} sx={{mr: 2}}/> Excluir</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Card>

            {success ? 
                <Alert variant="outlined" severity="success" sx={{my:2}} onClose={() => {setSuccess()}}>
                    {success}
                </Alert>
            : ''}

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
                    <Form name={data.name} iconProps={data.icon} data={data}/>
                </Card>
            </Modal>

            <Modal
                open={openDetails}
                onClose={handleCloseDetauils}
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
                        <Button variant="fill" onClick={handleCloseDetauils}><IconProvider icon={'mingcute:close-fill'} /></Button>
                    </Grid>
                        <Calendar highlightedDaysProp={dateList}/>
                </Card>
            </Modal>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {error ? 
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            : ''}

            
        </>
    )
}