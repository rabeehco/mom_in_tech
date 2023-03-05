import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './Details.module.css'
import { deleteJob } from '../../../../service/MomintechApi';
import { getAJob } from '../../../../service/MomintechApi';
import { SkeletonOfJob } from '../../../../service/SkeletonFiller';


function JobDetails() {
    const params = useParams()
    const { jobId } = params
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const host = useSelector(state => state.auth.host)
    const [job, setJob] = useState([])
    const [isUser, setIsUser] = useState(false)
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const data = await deleteJob({ host, jobId, isAuth })
        if (data.status) {
            navigate('/job')
        }
    }

    const fetchData = async () => {
        const data = await getAJob({ host, jobId, isAuth })

        if (data.message) {
            return alert(data.message)
        }
        setJob(data)

        if (data.username === userName) {
            setIsUser(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [userName, isAuth])

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardOne}>            
                <div className={`${classes.blog} mt-4`}>
                   {job._id ? <Card > 
                        <Card.Body>
                            <Card.Title><h2>{job.title}</h2></Card.Title>
                            <Card.Text onClick={() => { navigate(`/job/${job._id}`) }}>
                                {job.description}
                            </Card.Text>
                            <Card.Subtitle className="text-dark">Apply to</Card.Subtitle>
                            <a className="text-decoration-none text-info" href={`mailto:${job.email}`} target='_blank'>{job.email}</a>
                            <br />
                            <div className='mt-4'>
                                {isUser ? <Button onClick={deleteHandler} variant="danger">Delete</Button> : null}
                            </div>
                        </Card.Body>
                    </Card> : <>{SkeletonOfJob}</>}
                </div>
            </div>            
        </div>
    )
}

export default JobDetails