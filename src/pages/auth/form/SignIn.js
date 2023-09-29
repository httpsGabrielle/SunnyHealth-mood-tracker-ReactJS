
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//services
import api from '../../../services/api'

// mui
import { Typography, TextField, InputAdornment, IconButton, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// 
import LoginPage from '..';
import IconProvider from '../../../components/IconProvider';
import palette from '../../../theme/design/palette';
//----------------------------------------------------------------

export default function SignIn() {
    const [ isLoading, setLoading ] = useState(false)
    const [error, setError] = useState()
    const [showPassword, setShowPassword] = useState(false)

    //
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    //
    const navigate = useNavigate();

    function handleLogin(){
        setLoading(true)
        const log = [{
            login: login,
            password: password
        }]
        api.post('/authenticate', log).then(
            response => {
                setLoading(false)
                navigate('/')
                sessionStorage.setItem('auth', response.data.token)
                sessionStorage.setItem('secret', response.data.user._id)
            },
            response => {
                setError(response.response.data?.message ?? 'Ocorreu um erro')
                setLoading(false)
            }
        )
    }

    return(
        <LoginPage>
            
            <Typography variant="h3">
                Sunny Health
            </Typography>
            

            <Typography sx={{ py: 1, mb: 3}} required>
                Ainda não tem uma conta? {''}
                <Link 
                    variant="link" 
                    to='/register'
                    style={{ textDecoration: 'none', color: palette.primary.light }} // Remova a decoração de link
                >
                    Registre-se
                </Link>
            </Typography>

            <TextField 
                name="login" 
                label="Email ou nome de usuário" 
                fullWidth  
                onChange={e=>{setLogin(e.target.value)}}
                sx={{my: 2}}
            />

            <TextField
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                sx={{my: 2}}
                onChange={e=>{setPassword(e.target.value)}}
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
                loading={isLoading} 
                variant="contained" 
                sx={{my: 2}}
                fullWidth
                onClick={e=>{handleLogin()}}
                type="submite"
            >
                Login
            </LoadingButton>
            
            {error ? 
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            : ''}

        </LoginPage>
    )
}