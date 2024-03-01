import { ReactNode, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import * as yup from 'yup';

import { useAuthContext } from "../../contexts";
import { useTheme } from "@emotion/react";


const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
})

interface ILoginProps {
  children: ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  


  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
    .validate({ email, password }, { abortEarly: false })
    .then(dadosValidados => {
      login(dadosValidados.email, dadosValidados.password)
      .then(() => {
        setIsLoading(false); 
        // foi criado mais um then, pois se colocasse o "setIsLoading(false);" o login pode demorar e bugar
      });
    })
    .catch((errors: yup.ValidationError) => {
      setIsLoading(false);

      errors.inner.forEach(error => {
        if (error.path === 'email') {
          setEmailError(error.message);
        } else if (error.path === 'password') {
          setPasswordError(error.message);
        }
      });
    });
  } 

  //anotação:  then() ====> é como se fosse um await


  if (isAuthenticated) return (
    <>{children}</>
  )

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Box
        component={Paper}
        elevation={18}
        borderRadius={10}
        sx={{ boxShadow: '0 0 30px #25252590', width: '90%', maxWidth: '800px'}}
        display='flex' flexDirection='row'
        height='420px'
      >
        <Box width='50%' padding='10px' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
          <CardContent>
            <Box display='flex' flexDirection='column' gap={1} width={250}>
              <Typography variant='h4' align='center' fontWeight={600} marginY={2}>Login</Typography>

              <TextField
                fullWidth
                type='email'
                label='Email'
                value={email} 
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError('')}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label='Senha'
                type='password'
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError('')}
                onChange={e => setPassword(e.target.value)}
              />
              <Typography fontSize='14px' textAlign='center'>
                Esqueceu sua senha?
              </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>

              <Button 
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit}
                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
              >
                Entrar
              </Button >

            </Box>
          </CardActions>
        </Box>
        <Box width='50%' 
          borderRadius=' 140px 40px 40px 100px'
          display='flex' alignItems='center' justifyContent='center'
          bgcolor='#5638a9'
        >
          <Box width='80%' height='45%'
            display='flex' alignItems='center' justifyContent='center' flexDirection='column'
          >
            <Typography variant='h4' align='center' fontWeight={600} marginY={2} color='#fff'>
              Holá !!
            </Typography>
            <Typography fontSize='14px' textAlign='center' color='#fff'>
              Se sua ótica ainda não for registrada, registre-se clicando no botão abaixo !!
            </Typography>
            <Button 
                variant="outlined"
                
                sx={{marginTop: 4, color: '#fff', border: '1px solid #fff'}}
              >
                Registrar
              </Button >
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
