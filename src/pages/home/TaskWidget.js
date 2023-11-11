
//----------------------------------------------------------------

import { Card, Checkbox, Divider, FormControlLabel, Grid, Typography } from "@mui/material";
import IconProvider from "../../components/IconProvider";

export default function Achievements(){
    return (
        <>
            <Card sx={{p: 3}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid><Typography variant="h6">Tarefas</Typography></Grid>
                    <Grid><IconProvider icon={'tabler:edit'}/></Grid>
                </Grid>
                <Divider/>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{boxShadow: 2, my: 2, p: 1}}
                >
                    <FormControlLabel control={<Checkbox />}/>
                    <Grid>
                        <Typography variant="h3">Limpar os vasos</Typography>
                        <Typography variant="subtitle3">
                            <IconProvider icon={'mingcute:calendar-2-line'} width={'14'} sx={{mr: 1}}/>
                            12 Nov. 2022
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}