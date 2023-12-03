import { Box, Grid } from "@mui/material";
// ----------------------------------------------------------------

export default function Profiler(){
    return (
        <>
            <Grid 
                container
            >
                <Grid item>

                </Grid>

                <Grid item>
                    <Box sx={{width: 32, height: 32, backgroundColor: '#ffc8dd', zIndex: 3}}>
                        <Box sx={{width: 32, height: 32, backgroundColor: '#fff', zIndex: 1}}>

                        </Box>
                    </Box>
                </Grid>


            </Grid>
        </>
    )
}