// mui
import { Grid } from '@mui/material';
//

//----------------------------------------------------------------

export default function LoginPage({children}){
    return (
        <>
            <Grid 
                container 
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: '100vh'
                }}
                spacing={0}
            >
                <Grid xs item sx={{backgroundColor: '#F2EAE8', height: '100%'}} fullWidth>
                </Grid>

                <Grid xs={6} lg={3.5} item sx={{p:10}}>
                    {children}
                </Grid>
            </Grid>

        </>
    )
}