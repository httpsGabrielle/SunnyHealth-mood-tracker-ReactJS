
import { Box, Card, Grid, Typography } from "@mui/material";

import Placeholder  from './../../components/assets/avatar/placeholder.png'

//----------------------------------------------------------------

export default function Achievements(){
    
    return (
        <>
            <Card sx={{height: '100%', p: 3}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography sx={{p:1}}>Perfil</Typography>
                    <Box
                        component="img"
                        sx={{
                            height: 150,
                            WebkitFilter: 'drop-shadow(-2px -1px 6px rgba(0, 0, 0, 0.1))',
                            filter: 'drop-shadow(-2px -1px 5px rgba(0,0,0,0.1))',
                        }}
                        alt="Avatar Icon."
                        src={Placeholder}
                    />
                </Grid>
            </Card>
        </>
    )
}