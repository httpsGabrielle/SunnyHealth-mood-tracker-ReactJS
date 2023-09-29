import { Link, useNavigate } from 'react-router-dom';

// @mui
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

//
import linkList from './list'
import IconProvider from '../../../components/IconProvider';
// ----------------------------------------------------------------

export default function NavItems(){
    //
    const navigate = useNavigate();

    return (
        <Box sx={{ p:2}}>
            <List>
                {linkList.map((item) => (
                    <>
                        <Typography variant="submenu" sx={{fontWeight: 'bold'}}>{item.label}</Typography>
                        <ListItemButton sx={{mb: 1, mt: 2}} onClick={e=>{navigate(item.path)}}>
                            <ListItemIcon>
                                <IconProvider icon={item.icon}/>
                            </ListItemIcon>
                            <ListItemText>{item.title}</ListItemText>
                        </ListItemButton>
                    </>
                ))}
            </List>
        </Box>
    )
}