import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './Details.module.css'
import { deleteEvent } from '../../../../service/MomintechApi';
import { getAEvent } from '../../../../service/MomintechApi';

function EventDetails() {
    const params = useParams()
    const { eventId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const host = useSelector(state => state.auth.host)
    const [event, setEvent] = useState([])
    const [isUser, setIsUser] = useState(false)
    const navigate = useNavigate()

    const deleteEventHandler = async () => {
        try {
            const data = await deleteEvent({host, eventId, isAuth})
            if(data.status){
                return navigate('/event')
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const fetchData = async () => {
        const data = await getAEvent({host, eventId, isAuth})
        
        if(data.message){            
            return alert(data.message)
        }

        setEvent(data)

        if (data.username === userName) {
            setIsUser(true)
        } 
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardOne}>
                <div className={`${classes.blog} mt-4`}>
                    <Card>
                        <Card.Body>
                            <Card.Title><h2>{event.title}</h2></Card.Title>
                            <Card.Text>
                                {event.description}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">Location <p className='text-dark'>{event.location}</p></Card.Subtitle>
                            <a href={`https://${event.link}`} target="_blank">{event.link}</a>
                            <div className='mt-3'>
                                {isUser ? <Button onClick={deleteEventHandler} style={{background: '#dc3545', border: 'none'}}>Delete</Button> : null}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
  
        </div>
    )
}

export default EventDetails