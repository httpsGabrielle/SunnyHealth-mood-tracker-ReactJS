import { Card, Box, Typography, Grid } from "@mui/material";
import IconProvider from "../../components/IconProvider";
import palette from "../../theme/design/palette"
// ----------------------------------------------------------------

export default function Notes({note}){
    return(
        <>
            <Card sx={{p:3}}>
                <Grid container alignItems="center">
                    <Grid sx={{pr: 2}}>
                        <Box 
                            sx={{
                                backgroundColor: palette.warning.light,
                                borderRadius: '50%',
                                height: 48,
                                width: 48,
                                p:1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <IconProvider icon={'quill:user-happy'}/>
                        </Box>
                    </Grid>
                    <Grid>
                        <Typography>{new Date(note.createdAt).toLocaleDateString("pt-BR", {year: "numeric",month: "long",day: "numeric"})}</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{m:3, p: 3, backgroundColor: palette.grey[200], borderRadius: 8}} >
                    <Grid container alignItems="center">
                        <Grid sx={{pr: 2}}>
                            <Box 
                                sx={{
                                    backgroundColor: palette.common.white,
                                    borderRadius: '50%',
                                    height: 48,
                                    width: 48,
                                    p:1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <IconProvider icon={note.mood == 'feliz' ? 'mingcute:chat-2-fill' : 'solar:sad-square-line-duotone'}/>
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography>{note.text}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}