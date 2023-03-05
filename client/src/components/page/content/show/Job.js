import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './Show.module.css'
import { authActions } from '../../../store/auth'
import { getAllJob } from '../../../../service/MomintechApi';
import { SkeletonOfJob } from '../../../../service/SkeletonFiller';

function Job() {

    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const host = useSelector(state => state.auth.host)
    const dispatch = useDispatch()
    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        
        const fetchData = async () => {
            const data = await getAllJob({host, isAuth})
            
            if (data.status === 'Unauthorized') {
                return dispatch(authActions.clearToken())
            }
            setBlogList(data.post)
        }

        fetchData()

    }, [isAuth])


    return (

        <div className={classes.dashboard}>

            <div className={classes.dashboardOne}>

                {isAuth && <div className={`${classes.inputDiv} mt-4`}>
                    <Form.Control
                        onClick={() => { navigate('/createjob') }}
                        placeholder="Create a job"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        className={classes.createInput}
                    />
                </div>}

                {blogList.length > 0 ? blogList.map((job) => {
                    return <div key={job._id} className={`${classes.blog} mt-4`}>
                        <Card >
                            <Card.Body onClick={() => { navigate(`/job/${job._id}`) }}>
                                <Card.Title ><h2>{job.title}</h2></Card.Title>
                                <Card.Text>
                                    {job.description}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">Apply to</Card.Subtitle>
                                <a className="text-decoration-none text-info" href={`mailto:${job.email}`} target='_blank'>{job.email}</a>

                            </Card.Body>
                        </Card>
                    </div>

                }) : <> <div className={`${classes.blog} mt-4`}> {SkeletonOfJob}{SkeletonOfJob}{SkeletonOfJob} </div> </> }
                <div className="mb-5"></div>
            </div>
        </div>
    )
}

export default Job