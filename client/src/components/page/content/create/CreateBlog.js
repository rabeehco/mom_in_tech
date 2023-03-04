import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import classes from './CreateBlog.module.css'


function CreatePost() {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const host = useSelector(state => state.auth.host)    
    const titleRef = useRef()
    const [body, setBody] = useState('')

    const createPostHandler = async () => {
        try {                        
             await fetch(`${host}/blog`, {
                method: 'POST',
                body: JSON.stringify({
                    title: titleRef.current.value,
                    body: body, 
                    username: userName
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })        

            alert('Successfully Created a Post')
            navigate('/blog')

        } catch (e) {
            alert('Failed to Create Post' + e.message)
        }
    }
    const cancelHandler = () => {
        navigate('/blog')
    }

    useEffect(() => {
    titleRef.current && titleRef.current.focus()
    }, [])

    if(!isAuth){
        return <Navigate to='/blog' />
    }

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-5 border-rounded`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75`}>
                <h2 className='mt-3 fw-bold'>Create a Blog</h2>
                    <Form.Control                        
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        className={`${classes.title} w-75 mt-3`}
                    />
                    <div className='w-75 mt-2 mb-4'>
                    
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    // onReady={ editor => {                    
                    // } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setBody(data)
                    } }
                />
                    </div>

                    <div className="d-flex mb-4">
                        <Button onClick={createPostHandler} className={`me-5 ${classes.createPostBtn}`}>Create Post</Button>
                        <Button onClick={cancelHandler} className={`${classes.cancelBtn}`} >Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost 