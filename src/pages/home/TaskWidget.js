import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

import api from "../../services/api";

import { Backdrop, Button, Card, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Typography } from "@mui/material";

import IconProvider from "../../components/IconProvider";

// ----------------------------------------------------------------

export default function Achievements(){
    const navigate = useNavigate()

    const [taskList, setTaskList] = useState([])

    const [isLoading, setLoading ] = useState(false)

    useEffect(()=>{
        getTaskList()
    },[])

    function getTaskList(){
        setLoading(true)
        api.get(`/task/${secureLocalStorage.getItem('secret')}`).then(
            response => {
                setLoading(false)
                setTaskList(response.data.tasks)
            },
            response => {
                setLoading(false)
            }
        )
    }

    function handleCompleteTask(_id, status){
        const data = [{
            complete: !status
        }]
        setLoading(true)
        api.patch(`/task/${_id}`, data).then(
            response => {
                setLoading(false)
                getTaskList()
            },
            err => {
                setLoading(false)
            }
        ) 
    };


    return (
        <>
            <Card sx={{p: 3}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid>
                        <Typography variant="h6">Tarefas</Typography>
                    </Grid>
                    <Grid>
                        <IconButton
                            onClick={e=>{navigate('/tarefas')}}
                        >
                            <IconProvider icon={'tabler:edit'}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider/>
                {taskList.map((task)=>(
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        sx={{boxShadow: 2, my: 2, p: 1}}
                    >
                        <FormControlLabel control={<Checkbox checked={task.complete} onChange={e=>{handleCompleteTask(task._id, task.complete)}}/>}/>
                        <Grid>
                            <Typography variant="h3" sx={{textDecoration: task.complete ? 'line-through' : 'none'}}>{task.name}</Typography>
                            <Typography variant="subtitle3">
                                <IconProvider icon={'mingcute:calendar-2-line'} width={'14'} sx={{mr: 1}}/>
                                {new Date(task.date).toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric"})}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Card>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}