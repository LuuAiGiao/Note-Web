import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (
    <div>
        <Grid style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Paper style={{ padding: '20px', width: '300px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography style={{ fontWeight: 'bold' }} variant="h5" gutterBottom>
              Register
            </Typography>
            <form className='my-4'>
              <TextField
                style={{ width: '300px'}}
                fullWidth 
                type='text'
                label='Username'
                variant='outlined'
                margin='normal'
                name='username'
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
                required
              />
              <TextField
                style={{ width: '300px'}}
                fullWidth 
                type='password'
                label='Confirm password'
                variant='outlined'
                margin='normal'
                name='confirmPassword'
                required
              />
              <Button style={{ left: '100px', top: '10px', backgroundColor: 'rgb(157, 136, 112)'}} variant='contained' color='success' type='submit'>
                register
              </Button>
            </form>
            <p style={{ color: 'black', marginTop: '50px' }}>
              Already have an account?
              <Link style={{ textDecoration: 'none', marginLeft: '10px', color: 'blue' }} to='/login'>
                Login
              </Link>
            </p>
          </Paper>
          </Grid>
    </div>
  )
}

export default RegisterForm