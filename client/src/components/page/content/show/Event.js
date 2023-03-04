import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './Show.module.css'
import { authActions } from '../../../store/auth'
import Skeleton from "@mui/material/Skeleton";
import { getAllEvent } from '../../../../service/MomintechApi';

function Event() {

  const SkeletonOfBlog = (

    <div className={`${classes.blog} mt-4`}>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>
              <Skeleton width="220px" animation="wave" />
            </h2>
          </Card.Title>
          <Card.Text>
            <>
              <Skeleton animation="wave" /> <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          </Card.Text>
          <Card.Subtitle></Card.Subtitle>
        </Card.Body>
      </Card>
    </div>

  );

  const navigate = useNavigate()
  const isAuth = useSelector(state => state.auth.token)
  const host = useSelector(state => state.auth.host)
  const dispatch = useDispatch()
  const [eventList, setEventList] = useState([])

  const getEvents = async () => {
    const data = await getAllEvent({host, isAuth})
    setEventList(data.event)

    if (data.status === 'Unauthorized') {
      return dispatch(authActions.clearToken())
    }
    if (!data.status) {
      alert(data.message)
    }

  }

  useEffect(() => {

    getEvents()

  }, [isAuth])


  return (

    <div className={`${classes.dashboard}`}>

      <div className={classes.dashboardOne}>

       {isAuth && <div className={`${classes.inputDiv} mt-4`}>
          <Form.Control
            onClick={() => { navigate('/createevent') }}
            placeholder="Create an event"
            type="text"
            id="createPost"
            aria-describedby="createapost"
            className={classes.createInput}
          />
        </div>}

        {eventList.length > 0 ? eventList.map((event) => {
          return <div key={event._id} className={`${classes.blog} mt-4`}>
            <Card onClick={() => { navigate(`/event/${event._id}`) }}>
              <Card.Body>
                <Card.Title><h2>{event.title}</h2></Card.Title>
                <Card.Text>
                  {event.description}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Location <p className='text-dark'>{event.location}</p></Card.Subtitle>
                <a href={`https://${event.link}`} target="_blank">{event.link}</a>

              </Card.Body>
            </Card>
          </div>

        }) : <> {SkeletonOfBlog}{SkeletonOfBlog}{SkeletonOfBlog}</> }
        <div className="mb-5"></div>

      </div>
    </div>
  )
}

export default Event