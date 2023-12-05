import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Achievements from "../../components/assets/icon/achievements.svg";

import avatar from "../../components/assets/avatar/full-body-avatar/avatar.svg";

import { Box, Button, Grid, Tooltip } from "@mui/material";

import Avatar from "./Avatar";

import { Container } from "@mui/system";

import  IconProvider  from '../../components/IconProvider';
import secureLocalStorage from "react-secure-storage";
import api from "../../services/api";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------

const colors = [ 
    {
        pattern: 'liso',
        color_01: '#DFD7D7',
        color_02: '#DFD7D7',
        tail: '#DFD7D7'
    },
    {
        pattern: 'liso',
        color_01: '#939393',
        color_02: '#939393',
        tail: '#939393'
    },
    {
        pattern: 'liso',
        color_01: '#323232',
        color_02: '#323232',
        tail: '#323232'
    },
    {
        pattern: 'liso',
        color_01: '#FF8A00',
        color_02: '#FF8A00',
        tail: '#FF8A00'
    },
    {
        pattern: 'liso',
        color_01: '#C98C58',
        color_02: '#C98C58',
        tail: '#C98C58'
    },
    {
        pattern: 'liso',
        color_01: '#FAC1BE',
        color_02: '#FAC1BE',
        tail: '#FAC1BE'
    }
]


const patterns = [
    {
        pattern: 'manchinhas',
        color_01: '#fff',
        color_02: '#32302E',
        tail: '#32302E'
    },
    {
        pattern: 'manchinhas',
        color_01: '#FFEBD6',
        color_02: '#FC753C',
        tail: '#FC753C'
    },
    {
        pattern: 'siamese',
        color_01: '#E5B889',
        color_02: '#6F3902',
        tail: '#6F3902'
    },
    {
        pattern: 'tigrado',
        color_01: '#DFD6D7',
        color_02: '#32302E',
        tail: '#DFD6D7'
    },
    {
        pattern: 'tigrado',
        color_01: '#FF763B',
        color_02: '#FF4D00',
        tail: '#FF4D00'
    },
    {
        pattern: 'tricolor',
        color_01: '#fff',
        color_02: '#6F3902',
        tail: '#D9740D'
    }
]
//----------------------------------------------------------------

export default function Profile(){

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [color, setColor] = useState(colors[0])

    const [secondary, setSecondary] = useState()

    const [pattern, setPattern] = useState()

    const [tail, setTail] = useState()

    const handleColor = (selectedColor) => {
        setColor(selectedColor); 
        setSecondary(selectedColor); 
        setPattern(); 
        setTail()
    }

    const handlePattern = (selectedPattern) => {
        setColor(selectedPattern.color_01)
        setSecondary(selectedPattern.color_02); 
        setPattern(selectedPattern.pattern); 
        setTail(selectedPattern.tail)
    }

    useEffect(()=>{
        getProfile()
    }, [])

    function getProfile(){
        api.get(`/usuario/${secureLocalStorage.getItem('secret')}`)
        .then(
            response => {
                console.log(response.data)
                setColor(response.data.avatar.color_01)
                setColor(response.data.avatar.color_02)
                setPattern(response.data.avatar.pattern)
                setTail(response.data.avatar.tail)
            }
        )
    }

    function handleSave(){
        setLoading(true)
        const update = [{
            avatar:{
            color_01: color,
            color_02: secondary,
            pattern:  pattern,
            tail: tail
        }}]
        api.patch(`/usuario/${secureLocalStorage.getItem('secret')}`, update)
        .then(
            response => {
                console.log(response.data)
                setLoading(false)

            }
        )
    }

    return (
        <>
            <Container>

                <Grid 
                    container
                    justifyContent="space-between"
                >
                    <Grid item>

                    </Grid>

                    <Grid item sx={{ height: '80vh' }} >
                        <Grid 
                            container 
                            spacing={3} 
                            alignItems="center"
                            justifyContent='end'
                            sx={{ height: '100%' }}
                            flexDirection='column'
                        >
                            <Grid item>
                                <Avatar color={color} secondary={secondary} pattern={pattern} tail={tail}/>
                            </Grid>
                            <Grid 
                                container 
                                spacing={3} 
                                alignItems="end"
                                sx={{ width: 300 }}
                            >
                                {colors.map((color)=>(
                                    <Grid xs={2} item>
                                        <Box 
                                            onClick={e=>{handleColor(color.color_01)}}
                                            sx={{
                                                boxShadow: 5, 
                                                border: 3, 
                                                borderColor: '#fff', 
                                                borderRadius: 5, 
                                                width: 32, 
                                                height: 32, 
                                                backgroundColor: color.color_01,
                                                '&:hover': {
                                                    border: 0
                                                }
                                            }}/>
                                    </Grid>
                                ))}
                                {patterns.map((patt, i)=>(
                                    <Grid item xs={2}>
                                        <Grid 
                                            container 
                                            onClick={e=>{handlePattern(patt)}}
                                            flexDirection='column'
                                            sx={{
                                                    boxShadow: 5, 
                                                    border: 3, 
                                                    borderColor: '#fff', 
                                                    borderRadius: 5, 
                                                    width: 32, 
                                                    height: 32,
                                                    '&:hover': {
                                                        border: 0
                                                    }
                                            }}
                                        >
                                            <Grid item sx={{height: '100%', backgroundColor: patt.color_01, borderStartStartRadius: 5, borderBottomLeftRadius: 5}}></Grid>
                                            <Grid item sx={{height: '100%', backgroundColor: patt.color_02, borderTopRightRadius: 5, borderBottomRightRadius: 5}}></Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Grid xs={12} item sx={{display: 'flex', justifyContent:  'flex-end', alignItems: 'end'}}>
                                    <LoadingButton loading={loading} variant="outlined" startIcon={<IconProvider icon='basil:save-outline' />} onClick={e=>{handleSave()}}>
                                        Salvar
                                    </LoadingButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid 
                            container
                            flexDirection='column'
                            sx={{
                                p: 3
                            }}
                            spacing={3}
                        >
                            <Grid item>
                                <Tooltip title="Conquistas">
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 98
                                        }}
                                        alt="Avatar Icon."
                                        src={Achievements}
                                        onClick={e=> {navigate('/profile/achievements')}}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}