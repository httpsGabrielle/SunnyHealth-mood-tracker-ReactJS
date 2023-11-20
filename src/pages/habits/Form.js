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
import { Card, Typography, Grid, Button, Box, TextField, Alert, Badge, Menu, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { grey, lightGreen } from "@mui/material/colors";

// ----------------------------------------------------------------
export default function FormHabits(){
    const [isLoading, setLoading ] = useState()
    const [error, setError] = useState()
    //
    const [habitName, setHabitName] = useState()
    const [weekdaysRepetion, setWeekdaysRepetion] = useState([])
    const [selectedTurno, setSelectedTurno] = useState('Qualquer Turno')
    const [icon, setIcon] = useState('mingcute:alarm-1-line')
    const [iconColor, setIconColor] = useState('#ffc8dd')
    const [date, setDate] = useState()
    const [observation, setObservation] = useState()

    const [weekdays, setWeekdays] = useState([
        {label: 'D', day: 'Domingo', selected: false},
        {label: 'S', day: 'Segunda', selected: true},
        {label: 'T', day: 'Terça', selected: true},
        {label: 'Q', day: 'Quarta', selected: true},
        {label: 'Q', day: 'Quinta', selected: true},
        {label: 'S', day: 'Sexta', selected: true},
        {label: 'S', day: 'Sábado', selected: false},
    ])

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function handleSave(){
        setLoading(true)
        const newtarefa = [{
            name: habitName,
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

    function handleSelectDays(value, index){
        let wDays = [...weekdays]
        wDays[index].selected = !wDays[index].selected
        setWeekdays(wDays)
        let selectedDays = weekdaysRepetion
        const indexOfDay = selectedDays.indexOf(value)

        if(indexOfDay === -1){
            selectedDays.push(value);
        }else{
            selectedDays.splice(indexOfDay, 1);
        }

        setWeekdaysRepetion(selectedDays)
    }

    const turnos = [
        {icon:'mingcute:sun-fog-line', day: 'Manhã'},
        {icon:'mingcute:sun-fill', day: 'Tarde'},
        {icon:'mingcute:partly-cloud-night-line', day: 'Noite'},
        {icon:'lucide:cloud-sun', day: 'Qualquer turno'}
    ]

    const iconscolors = [
        '#ffc8dd',
        '#bdb2ff',
        '#a0c4ff',
        '#8eecf5',
        '#c1fba4',
        '#ffd670',
        '#ff9770',
        '#ffadad',
        '#f08080',
        '#2b2d42',
    ]

    const icons = [
        'mingcute:alarm-1-line',
        'mingcute:bath-line',
        'mingcute:basket-line',
        'mingcute:broom-line',
        'akar-icons:plant',
        'mingcute:moon-stars-line',
        'mingcute:sleep-fill',
        'mingcute:palette-line',
        'mingcute:pig-line',
        'mingcute:suitcase-fill',
        'mingcute:umbrella-2-line',
        'mingcute:yinyang-line',
        'mingcute:tree-3-fill',
        'mingcute:pray-line',
        'mingcute:bike-fill',
        'icon-park-outline:muscle',
        'mingcute:run-fill',
        'fluent:run-16-filled',
        'uil:book-open',
        'mingcute:hand-heart-line',
        'la:piggy-bank',
        'mingcute:music-2-fill',
        'zondicons:location-food',
        'mingcute:apple-fill',
        'solar:pills-3-broken',
        'solar:jar-of-pills-2-line-duotone'
    ]

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Nome</Typography>
                    <TextField variant="outlined" fullWidth multiline onChange={e=>{setHabitName(e.target.value)}} placeholder="Ex. Estudar novo idioma"/>
                </Grid>

                <Grid item xs={2}>
                    <Typography sx={{pb:2}}>Ícone</Typography>
                        <Badge 
                            badgeContent={
                                <IconProvider icon={'fluent:edit-settings-20-regular'}  
                                width={12} 
                                sx={{
                                    width: 32,
                                    height: 32,
                                    p: 0.8,
                                    borderRadius: 100,
                                    bgcolor: grey[100],
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: '#fff'
                                    },
                                }}
                                onClick={handleClick}
                            />}  
                            overlap='circular'
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 80,
                                    height: 80,
                                    color: iconColor,
                                }}
                            >
                                <IconProvider icon={icon} width={36}/>
                            </Box>
                        </Badge>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            sx={{width: 900}}
                        >
                            <Grid container spacing={2} sx={{p: 2}}>
                                {icons.map((icon) =>(
                                    <Grid item>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: 30,
                                                height: 30,
                                                borderRadius: 2,
                                                color: iconColor,
                                                boxShadow: icon === icon ? 3 : 0,
                                                border: 4,
                                                borderColor: '#fff'
                                            }}
                                            onClick={e=>{setIcon(icon)}}
                                        >
                                            <IconProvider icon={icon}/>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Menu>
                </Grid>

                <Grid item xs={6}>
                    <Typography sx={{pb:2}}>Cor</Typography>
                    <Grid container spacing={2}>
                        {iconscolors.map((color) =>(
                            <Grid item>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 50,
                                        height: 40,
                                        borderRadius: 2,
                                        bgcolor: color,
                                        boxShadow: iconColor === color ? 3 : 0,
                                        border: 4,
                                        borderColor: '#fff'
                                    }}
                                    onClick={e=>{setIconColor(color)}}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Repetir</Typography>
                    <Grid container spacing={1}>
                        {weekdays.map((weekday, i) =>(
                            <Grid item>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        bgcolor: weekday.selected ? 'primary.main' : grey[100],
                                        color: weekday.selected ? '#FFF' : grey[900]
                                    }}
                                    onClick={e=>{handleSelectDays(weekday.day, i)}}
                                >
                                    {weekday.label}
                                </Box>
                            </Grid>
                        ))} 
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{pb:2}}>Turno</Typography>
                    <Grid container spacing={1}>
                        {turnos.map((turno, i) =>(
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 1,
                                        borderRadius: 100,
                                        bgcolor: turno.day === selectedTurno ? 'primary.main' : grey[100],
                                        color: turno.day === selectedTurno ? '#FFF' : grey[900]
                                    }}
                                    onClick={e=>{setSelectedTurno(turno.day)}}
                                >
                                    <IconProvider icon={turno.icon} sx={{mr: 2}}/> 
                                    {turno.day}
                                </Box>
                            </Grid>
                        ))} 
                    </Grid>
                </Grid>
                
                <Grid item>
                    {error ? 
                        <Alert variant="outlined" severity="error">
                            {error}
                        </Alert>
                    : ''}

                    <LoadingButton variant="contained" onClick={e=>{handleSave()}} loading={isLoading}>
                        <IconProvider icon={'fluent:save-24-regular'} sx={{mr:2}}/>
                        Salvar
                    </LoadingButton>
                </Grid>
            </Grid>
        </>
    )
}