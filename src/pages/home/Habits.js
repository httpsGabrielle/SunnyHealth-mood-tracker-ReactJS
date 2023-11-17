
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import IconProvider from '../../components/IconProvider' 

import { blue, yellow, lightGreen, deepPurple, pink, grey, purple } from '@mui/material/colors';
import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, Menu, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------

export default function Habits(){
    return (
        <>
            <Card 
                sx={{
                    p: 3,
                }}
            >
                <Grid item sx={{minHeight: '200px',}}>
                    <Box 
                        sx={{
                            bgcolor: purple['50'], 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 2
                        }}
                    >
                        <IconProvider icon={'lucide:cloud-sun'} sx={{mr: 2}}/> 
                        <Typography variant="subtitle2">QUALQUER HORA</Typography>
                    </Box>
                        <>
                            <Grid 
                                container 
                                direction="row"
                                alignItems="center"
                            >
                                <Grid item xs={8} sx={{border: 1, borderRadius: 2, borderColor: grey['200'], p: 2}}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <IconProvider icon={'lucide:cloud-sun'}/> 
                                        </Grid>
                                        <Grid item>
                                            Comer vegetais
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{p:5}}>
                                    <FormControlLabel control={<Checkbox />} label="Completar"/>
                                </Grid>
                            </Grid>
                        </>
                </Grid>
                <Grid item>
                    <Button 
                        fullWidth
                        variant="outlined"
                        sx={{borderRadius: '100px', alignSelf: 'flex-end'}}
                    >
                        Novo hábito
                    </Button>
                </Grid>
            </Card> 
        </>
    );
}
