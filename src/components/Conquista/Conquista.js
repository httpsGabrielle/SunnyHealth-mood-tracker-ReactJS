
import { Box, Button, Card, Grid, Modal, Typography } from "@mui/material";

import trofeu from "../../components/assets/icon/trofeu.png"
import { useState } from "react";
import { grey } from "@mui/material/colors";

// ----------------------------------------------------------------

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    p: 3,
};

export default function Conquista({ conquista }){

    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
    };
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Card sx={style}>
                    <Button fullWidth sx={{backgroundColor: '#6E84C1', color: '#fff', p:3, borderRadius: 5, fontSize: 28}}>
                        Parabéns !
                    </Button>

                    <Grid container sx={{justifyContent: 'center'}}>
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                m:5
                            }}
                            alt="Avatar Icon."
                            src={trofeu}
                        />
                    </Grid>
                    <Typography variant="h1" sx={{m:1}}>Você desbloqueou uma conquista!</Typography>
                    <Typography sx={{m:1}}>{conquista?.title ?? 'Vá até o painel para ver!'}</Typography>
                    <Grid container sx={{justifyContent: 'end'}}>
                        
                    <Button  sx={{border: 1, p:1}} onClick={e=>{handleClose()}}>
                        OK !
                    </Button>
                    </Grid>
                </Card>
            </Modal>
        </>
    )
}