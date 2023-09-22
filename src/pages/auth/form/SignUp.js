
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//services
import api from '../../../services/api'

// mui
import { Typography, TextField, InputAdornment, IconButton, Grid, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// 
import LoginPage from '..';
import IconProvider from '../../../components/assets/icon/IconProvider';

//----------------------------------------------------------------

export default function SignUp(req, res, next) {
    const [ isLoading, setLoading ] = useState(false)
    const [error, setError] = useState()
    const [showPassword, setShowPassword] = useState()
    //
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [nick, setNick] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()	

    //
    const navigate = useNavigate();


    function handleRegister(){
        setLoading(true)
        const reg = [{
            first_name: name,
            last_name: surname,
            nickname: nick,
            email: email, 
            password: password
        }]
        api.post('/usuario', reg).then(
            response => {
                setLoading(false)
                navigate('/')
            },
            response => {
                setError(response.response.data.message)
                setLoading(false)
            }
        )
    }

    return(
        <LoginPage>
            
            <Typography variant="h3">
                Sunny Health
            </Typography>

            <Typography sx={{ py: 1, mb: 3}}>
                Já tem uma conta? {''}
                <Link variant="link" to='/login'>Entrar</Link>
            </Typography>

            <Grid 
                container
                spacing={2}
            >
                <Grid xs item>
                    <TextField 
                        name="name" 
                        label="Nome" 
                        sx={{my: 1}}
                        onChange={e=>{setName(e.target.value)}}
                        fullWidth 
                    />
                </Grid>
                <Grid xs item>
                    <TextField 
                        name="surname" 
                        label="Sobrenome" 
                        onChange={e=>{setSurname(e.target.value)}}
                        sx={{my: 1}}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <TextField 
                name="nickname" 
                label="Nickname" 
                sx={{my: 1}}
                onChange={e=>{setNick(e.target.value)}}
                fullWidth
            />

            <TextField 
                name="email" 
                label="Email" 
                sx={{my: 1}}
                onChange={e=>{setEmail(e.target.value)}}
                fullWidth 
            />

            <TextField
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                onChange={e=>{setPassword(e.target.value)}}
                fullWidth
                sx={{my: 1}}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <IconProvider icon={showPassword ? 'fluent-emoji-high-contrast:eyes' : 'mingcute:eye-close-fill'} />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />

            <LoadingButton 
                loading={false} 
                variant="contained" 
                sx={{my: 2}}
                fullWidth
                onClick={e=>{handleRegister()}}
            >
                Criar conta
            </LoadingButton>

            {error ? 
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            : ''}

        </LoginPage>
    )
}