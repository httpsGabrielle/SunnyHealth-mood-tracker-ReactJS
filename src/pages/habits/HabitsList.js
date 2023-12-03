import { useEffect, useState } from "react";

import api from "../../services/api"

import { Button, Card, Container, Grid, Modal, Box, Typography, Backdrop, CircularProgress, Divider } from "@mui/material";

import IconProvider from '../../components/IconProvider'

import FormHabits from './Form'
import Habits from "./Habits";
import PieCharts from "../../components/chats/PieCharts"
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

const habits = [
    {
        name: 'Beber 200ml de água',
        icon: {
            color: '#bdb2ff',
            name: 'material-symbols:water-drop-rounded'
        }
    },
    {
        name: 'Fazer uma refeição saudável',
        icon: {
            color: '#bdb2ff',
            name: 'emojione-monotone:fork-and-knife-with-plate'
        }
    },
    {
        name: 'Comer frutas e verduras',
        icon: {
            color: '#bdb2ff',
            name: 'mingcute:apple-fill'
        }
    },
    {
        name: 'Dormir por 8 horas',
        icon: {
            color: '#ffc8dd',
            name: 'mingcute:sleep-fill'
        }
    },
    {
        name: 'Ir dormir antes das 22h',
        icon: {
            color: '#ffc8dd',
            name: 'mingcute:sleep-fill'
        }
    },
    {
        name: 'Organizar a bagunça',
        icon: {
            color: '#ffd670',
            name: 'mingcute:broom-line'
        }
    },
    {
        name: 'Fazer alongamento',
        icon: {
            color: '#c1fba4',
            name: 'tabler:stretching'
        }
    },
    {
        name: 'Fazer exercícios',
        icon: {
            color: '#c1fba4',
            name: 'icon-park-outline:muscle'
        }
    },
    {
        name: 'Ir a academia',
        icon: {
            color: '#c1fba4',
            name: 'healthicons:exercise-weights'
        }
    },
    {
        name: 'Meditar',
        icon: {
            color: '#a0c4ff',
            name: 'mdi:meditation'
        }
    },
    {
        name: 'Estabelecer 3 tarefas prioritárias do dia',
        icon: {
            color: '#a0c4ff',
            name: 'fluent:thinking-20-regular'
        }
    },
    {
        name: 'Refletir sobre o dia',
        icon: {
            color: '#a0c4ff',
            name: 'fluent:thinking-20-regular'
        }
    },
    {
        name: 'Estudar',
        icon: {
            color: '#a0c4ff',
            name: 'uil:book-open'
        }
    },
]


// ----------------------------------------------------------------

export default function HabitsList(){
    const [habitsList, setHabitsList] = useState([])
    //
    const [isLoading, setLoading ] = useState(false)

    const [error, setError] = useState()
    //
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setShowForm(false)
    };

    const [showForm, setShowForm] = useState(null);

    const [selectedHabit, setSelectedHabit] = useState(0);

    const handleSelectHabit = (i) => {
        setSelectedHabit(i)
        setShowForm('selected-habit')
    };

    useEffect(()=>{
        getHabitsList()
    },[])

    function getHabitsList(){
        setLoading(true)
        api.get(`/habits/${secureLocalStorage.getItem('secret')}`).then(
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
                                    <Button variant="fill" onClick={handleClose}><IconProvider icon={'mingcute:close-fill'} /></Button>
                                </Grid>
                                { showForm === 'selected-habit' ?
                                    <FormHabits name={habits[selectedHabit].name} iconProps={habits[selectedHabit].icon}/> 
                                : showForm === 'new-custom-habit' ? 
                                    <FormHabits/> 
                                : 
                                    <>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Button variant="contained" sx={{borderRadius: 5, px: 6}} onClick={e=>{setShowForm('new-custom-habit')}}>Criar um hábito customizado</Button>
                                        </Grid>
                                        <Divider sx={{my: 2}}><Typography variant="submenu" sx={{fontSize: 18}}>ou</Typography></Divider>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                height: 300,
                                                overflowY: 'scroll'
                                            }}
                                        >
                                            {habits.map((habit, i)=>(
                                                <Grid 
                                                    container
                                                    direction="row"
                                                    alignItems="center"
                                                    sx={{
                                                        border: 1,
                                                        borderColor: habit.icon.color,
                                                        borderRadius: 2,
                                                        mb: 2 
                                                    }}
                                                    onClick={e=>{handleSelectHabit(i)}}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            width: 80,
                                                            height: 80,
                                                            color: habit.icon.color,
                                                        }}
                                                    >
                                                        <IconProvider icon={habit.icon.name} width={36}/>
                                                    </Box>
                                                    <Typography>{habit.name}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                }
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