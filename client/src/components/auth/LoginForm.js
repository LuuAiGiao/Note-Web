import React, { useContext, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginForm() {

  //context
  const { loginUser } = useContext(AuthContext)

  //router
  const nav =  useNavigate();

  //local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const {username, password} = loginForm;

  const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

  const login = async event => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if(loginData.success) {
        nav('/dashboard', { replace: true })
      } else {

      }
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      
        <Grid style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Paper style={{ padding: '20px', width: '300px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography style={{ fontWeight: 'bold' }} variant="h5" gutterBottom>
              Log in
            </Typography>
            <form className='my-4' onSubmit={login}>
              <TextField
                style={{ width: '300px'}}
                fullWidth 
                type='text'
                label='Username'
                variant='outlined'
                margin='normal'
                name='username'
                value={username}
                onChange={onChangeLoginForm}
                required
              />
              <TextField
                style={{ width: '300px'}}
                fullWidth 
                type='password'
                label='Password'
                variant='outlined'
                margin='normal'
                name='password'
                value={password}
                onChange={onChangeLoginForm}
                required
              />
              <Button style={{ left: '100px', top: '10px', backgroundColor: 'rgb(157, 136, 112)'}} variant='contained' color='success' type='submit'>
                Login
              </Button>
            </form>
            <p style={{ color: 'black', marginTop: '50px' }}>
              Don't have an account?
              <Link style={{ textDecoration: 'none', marginLeft: '10px', color: 'blue' }} to='/register'>
                Register
              </Link>
            </p>
          </Paper>
          </Grid>
      
    </div>
  );
}
