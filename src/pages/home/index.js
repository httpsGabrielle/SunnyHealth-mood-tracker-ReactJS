
import palette from '../../theme/design/palette'

import { Card, Container, Grid, Typography } from "@mui/material";

import MoodTrackerWidget from './MoodTrackerWidget'
import AchievementsWidget from './AchievementsWidget';
import IconProvider from '../../components/IconProvider';
import Habits from './Habits';
import TaskWidget from './TaskWidget'
// ----------------------------------------------------------------


export default function Home(){
    return (
        <>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    sx={{p:3}}
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Typography variant="h6"><IconProvider icon={'mingcute:sun-fog-line'} sx={{mr: 2}}/>Home</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <MoodTrackerWidget/>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <AchievementsWidget/>
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
                    <Grid item xs={12}>
                        <Typography variant="h6"> O que já fez hoje ?</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Habits/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TaskWidget/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}