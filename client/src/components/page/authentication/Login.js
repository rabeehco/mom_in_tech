import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { userLogin } from '../../../service/MomintechApi';

function Login() {
  const usernameRef = useRef() 
  const passwordRef = useRef()

  const isAuth = useSelector(state => state.auth.token)
  const host = useSelector(state => state.auth.host)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLoginHandler = async (event) => {
    event.preventDefault()
    
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = await userLogin({username, password, host})
    
    if (data.status) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      dispatch(authActions.userName(localStorage.getItem('username')))
      dispatch(authActions.token(localStorage.getItem('token')))
      navigate('/')
      alert('Login Successfully!')
    }  

    if(data.errorMessage) {
      alert(data.errorMessage)
    }
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (

    <div style={{ height: '80%', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <Card className="">
        <Card.Body style={{ width: '400px' }}>

          <Card.Title className="mb-3">Log in</Card.Title>
          <Form onSubmit={onLoginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control ref={usernameRef} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Password" />
            </Form.Group>           
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login