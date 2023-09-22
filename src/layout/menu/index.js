import { Box, Card, Grid, List, ListItemText } from '@mui/material';
//
import NavItems from './nav-items'
// ----------------------------------------------------------------

export default function Menu(){
    return (
        <Grid item xs={0} lg={2} sx={{ bgcolor: 'grey.50', boxShadow: 1, minHeight: '100vh' }}>
            <NavItems/>
        </Grid>
    )
}