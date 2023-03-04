import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import classes from './CreateEvent.module.css'

function Event() {

    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const host = useSelector(state => state.auth.host)
    const userName = useSelector(state => state.auth.username)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const locationRef = useRef()
    const linkRef = useRef()


    const createPostHandler = async () => {
        try {
            await fetch(`${host}/event`, {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    location: locationRef.current.value,
                    link: linkRef.current.value,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })

            alert('Successfully Created a Post')
            navigate('/event')

        } catch (e) {
            alert('Failed to Create Post')
        }
    }
    const cancelHandler = () => {
        navigate('/event')
    }

    useEffect(() => {
        titleRef.current && titleRef.current.focus()
    }, [])

    if (!isAuth) {
        return <Navigate to='/event' />
    }

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-4`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75`}>
                    <h2 className='mt-3 fw-bold'>Create an Event</h2>
                    <Form.Control
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="email"
                        aria-describedby="createapost"
                        className={`${classes.eventFormInput} w-75 mt-3`}
                    />

                    <Form.Group className="my-3 w-75" controlId="exampleForm.ControlTextarea1">
                        <Form.Control className={`${classes.eventFormInput}`} ref={descriptionRef} as="textarea" placeholder='Description' rows={8} cols={58} />
                    </Form.Group>

                    <Form.Control
                        ref={locationRef}
                        placeholder="Location"
                        type="text"
                        id="location"
                        aria-describedby="createaevent"
                        className={`${classes.eventFormInput} w-75 `}
                    />

                    <Form.Control
                        ref={linkRef}
                        placeholder="Link"
                        type="url"
                        id="link"
                        aria-describedby="createaevent"
                        className={`${classes.eventFormInput} w-75 mt-3`}
                    />

                    <div className="d-flex mb-4 mt-4">
                        <Button onClick={createPostHandler} className={`me-5 ${classes.createPostBtn}`}>Create Event</Button>
                        <Button onClick={cancelHandler} className={`${classes.cancelBtn}`}>Cancel</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event 