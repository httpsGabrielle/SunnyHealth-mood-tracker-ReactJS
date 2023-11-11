
import { Card, Grid, Typography } from "@mui/material";

//----------------------------------------------------------------

export default function Achievements(){
    return (
        <>
            <Card sx={{height: '100%', p: 3}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography>Perfil</Typography>

                </Grid>
            </Card>
        </>
    )
}