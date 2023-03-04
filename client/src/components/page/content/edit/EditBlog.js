import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import classes from './EditBlog.module.css'
import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getABlog } from '../../../../service/MomintechApi';
import { editBlog } from '../../../../service/MomintechApi';

function EditBlog() {

    const params = useParams()
    const { blogId } = params
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.token)
    const userName = useSelector(state => state.auth.username)
    const host = useSelector(state => state.auth.host)
    const [blog, setBlog] = useState([])
    const [body, setBody] = useState()
    const [like, setLike] = useState(false);
    const titleRef = useRef()



    const editPostHandler = async () => {
        const title = titleRef.current.value;
        const data = await editBlog({ title, body, userName, blogId, isAuth, host })

        if (data.status) {
            alert('Successfully Created a Post')
            return navigate('/blog')
        }

        if(data.errorMessage){
            alert(data.errorMessage)
        }

    }

    const cancelHandler = () => {
        navigate('/blog')
    }

    const fetchData = async () => {
        const data = await getABlog({ host, blogId })

        if (data.errorMessage) {
            return alert(data.errorMessage)
        }

        setBlog(data)
        titleRef.current.value = data.title
    }

    useEffect(() => {
        try {
            fetchData()
        } catch (e) {
            alert(e.message)
        }
    }, [userName, isAuth])

    return (

        <div className={`${classes.dashboard}`}>
            <div className={`${classes.dashboardOne} pt-5 border-rounded`}>
                <div className="d-flex justify-content-start align-items-start w-75 mb-1">
                </div>
                <div className={`${classes.titleDiv} w-75 rounded`}>
                    <Form.Control
                        ref={titleRef}
                        placeholder="Title"
                        type="text"
                        id="createPost"
                        aria-describedby="createapost"
                        className={`${classes.inputMain} w-75 mt-3`}
                    />
                    <div className='w-75 mt-2 mb-4'>
                        <CKEditor

                            editor={ClassicEditor}
                            data={blog.body}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBody(data)
                            }}
                        />
                    </div>
                    <div className="d-flex mb-4">
                        <Button onClick={editPostHandler} variant="success" className='me-5'>Edit Post</Button>
                        <Button onClick={cancelHandler} variant="danger" className=''>Cancel</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBlog 