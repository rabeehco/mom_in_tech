import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import React, { useEffect, useState } from 'react'
import classes from './NavigationBar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { fetchSearchQueryData } from '../../../service/MomintechApi';

import { Link, useNavigate, useParams } from 'react-router-dom'
const usernameLogo = 'https://res.cloudinary.com/deuyeqft4/image/upload/v1669826792/blahblah_pjtgxd.png'

function NavigationBar() {
  const [path, setPath] = useState('')
  const winPath = window.location.pathname

  const dispatch = useDispatch()
  const host = useSelector(state => state.auth.host)
  const isAuth = useSelector(state => state.auth.token)
  const userName = useSelector(state => state.auth.username)
  const [text, setText] = useState('')
  const [fetchResult, setFetchResult] = useState([])
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(authActions.clearToken())
    navigate('/')
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Welcome {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : null}</Popover.Header>
      <Popover.Body>
        <div className='d-flex align-items-center justify-content-center'>
          <Button variant="outline-danger" onClick={logoutHandler}>Logout</Button>{' '}
        </div>
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    async function fetch() {
      const data = await fetchSearchQueryData({ host, text, path })
      setFetchResult(data)
    }
    fetch()
  }, [text])

  useEffect(() => {
    if (winPath === '/blog' || winPath.includes("/blog/") || winPath.includes("/createblog") || winPath.includes("/editblog/") || winPath === '/' || winPath === '/login' || winPath === '/register') {
      setPath('blog')
    } else if (winPath === '/job' || winPath.includes("/job/") || winPath.includes("/createjob")) {
      setPath('job')
    } else if (winPath === '/event' || winPath.includes("/event/") || winPath.includes("/createevent")) {
      setPath('event')
    } else {
      setPath('')
    }
  }, [window.location.pathname])

  return (

    <Navbar className={classes.navbarStyle}>
      <Container fluid >
        <Navbar.Brand className='d-flex justify-content-center align-items-center' ><img style={{ width: '120px' }} src={usernameLogo} /></Navbar.Brand>
        <Nav>
          <Navbar.Collapse >
            <div style={{ position: 'relative', left: '-10%' }}>
              <Link className={classes.navbarColor} to='/'>Home</Link>
              <Link className={`ms-3 ${classes.navbarColor}`} to='/blog'>Blog</Link>
              <Link className={`ms-3 ${classes.navbarColor}`} to='/event'>Event</Link>
              <Link className={`ms-3 ${classes.navbarColor}`} to='/job'>Job</Link>
            </div>
            <div className='ms-4' style={{ width: '400px' }}>
              <ReactSearchAutocomplete
                items={fetchResult}
                maxResults='4'
                placeholder={'Search ' + path + 's'}
                onSearch={(str, res) => { setText(str) }}
                onSelect={(item) => { navigate(`/${path}/${item.id}`) }}
              />
            </div>

          </Navbar.Collapse>
        </Nav>
        <Nav>
          {!isAuth && <Nav.Link className={`pe-4 d-flex align-items-center`}><Link className={classes.navbarColor} to='/login'>Login</Link></Nav.Link>}

          {!isAuth && <Nav.Link ><Link className={classes.signupButton} to='/register'>Signup</Link></Nav.Link>}

          {isAuth && <Nav.Link > <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button style={{ backgroundColor: 'rgb(62 52 168)', border: 'none' }} size='lg'>{userName.charAt(0).toUpperCase() + userName.slice(1)}</Button>
          </OverlayTrigger></Nav.Link>}



        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar   