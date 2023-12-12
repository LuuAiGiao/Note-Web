import React, { useContext } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import {AuthContext} from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'
const Auth = ({ authRoute }) => {
    const navigate = useNavigate()
    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body
    console.log("auth loading: ", authLoading)
	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (isAuthenticated) return navigate('/dashboard', { replace: true })
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)
    // const navigate = useNavigate()
    // const { authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    // let body

    // console.log("auth loading: ", authLoading)

    // if(authLoading) {
    //     body = (
    //         <div className='d-flex justify-content-center mt-2'>
    //             <Spinner animation='border' variant='info' />
                
    //         </div>
    //     )
    // } else if(isAuthenticated) {
    //     navigate('/dashboard', { replace: true })
    // } else {
    //     body = (
    //         <>
    //         {authRoute === 'login' && <LoginForm/>}
    //         {authRoute === 'register' && <RegisterForm/>}
    //         </>
    //       )
    // }
    //---------------------------------------------------
    // let body
    //     body = (
    //         <>
    //         {authRoute === 'login' && <LoginForm/>}
    //         {authRoute === 'register' && <RegisterForm/>}
    //         </>
    //       )
  return (
    <div className='landing'>
        <div className='dark-overlay'>
            <div className='landing-inner'>
                <h1 style={{ margin: 0 }}>Note Web</h1>
                <h4 style={{ marginBottom: '10px' }}>Keep track of what you are learning</h4>
                {body}
            </div>
        </div>
    </div>
  )
}

export default Auth