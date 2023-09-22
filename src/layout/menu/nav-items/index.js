import { Link, useNavigate } from 'react-router-dom';

// @mui
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

//
import linkList from './list'
import IconProvider from '../../../components/assets/icon/IconProvider';
// ----------------------------------------------------------------

export default function NavItems(){
    //
    const navigate = useNavigate();

    return (
        <Box>
            <List>
                {linkList.map((item) => (
                    <>
                        <Typography variant="p" sx={{fontWeight: 'bold'}}>{item.label}</Typography>
                        <ListItemButton onClick={e=>{navigate(item.path)}}>
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