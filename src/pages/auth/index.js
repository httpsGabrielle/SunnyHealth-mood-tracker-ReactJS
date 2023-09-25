// mui
import { Grid, Typography } from '@mui/material';
//
import art from '../../components/assets/illustration/auth-art.png'
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
                <Grid 
                    xs 
                    item 
                    sx={{
                        backgroundColor: '#D2D3F3', 
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }} 
                    fullWidth
                >
                    <img src={art}/>
                    <Typography>
                        Faça a sua saúde mental ser sua prioridade.
                    </Typography>
                </Grid>

                <Grid xs={6} lg={3.5} item sx={{p:10}}>
                    {children}
                </Grid>
            </Grid>

        </>
    )
}