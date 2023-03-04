import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import classes from './CreateJob.module.css'

function Job() {

    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const host = useSelector(state => state.auth.host)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const emailRef = useRef()
    const userName = useSelector(state => state.auth.username)

    const createPostHandler = async () => {
        try {
             await fetch(`${host}/job`, {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    email: emailRef.current.value,
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })

            alert('Successfully Created a Post')
            navigate('/job')

        } catch (e) {
            alert('Failed to Create Post')
        }
    }

    useEffect(() => {
        titleRef.current && titleRef.current.focus()
    }, [])

    const cancelHandler = () => {
        navigate('/job')
    }

    if (!isAuth) {
        return <Navigate to='/job' />
    }

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-4`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75`}>
                <h2 className='mt-3 fw-bold'>Create a Job Post</h2>
                    <Form.Control
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="email"
                        aria-describedby="createapost"
                        className={`${classes.createJobInput} w-75 mt-3`}
                    />

                    <Form.Group className="my-3 w-75" controlId="exampleForm.ControlTextarea1">
                        <Form.Control className={`${classes.createJobInput}`} ref={descriptionRef} as="textarea" placeholder='Description' rows={8} cols={58} />
                    </Form.Group>

                    <Form.Control
                        ref={emailRef}
                        placeholder="Email"
                        type="email"
                        id="email"
                        aria-describedby="createapost"
                        className={`${classes.createJobInput} w-75 `}
                    />

                    <div className="d-flex mb-4 mt-4">
                        <Button onClick={createPostHandler} className={`me-5 ${classes.createPostBtn}`}>Create Job</Button>
                        <Button onClick={cancelHandler} className={`${classes.cancelBtn}`}>Cancel</Button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Job 