import React, { useRef, useState, useEffect } from 'react'
import classes from './ChatBox.module.css'
import Form from 'react-bootstrap/Form';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from './store/auth'
import io from 'socket.io-client'
import { sendMessage, loadMoreMessage, syncMessage } from '../service/MomintechApi';


function ChatBox() {
    const chatMessageDiv = useRef(null)
    const inputRef = useRef()
    const dispatch = useDispatch()
    const userName = useSelector(state => state.auth.username)
    const isAuth = useSelector(state => state.auth.token)
    const host = useSelector(state => state.auth.host)
    const toggleChat = useSelector(state => state.auth.isChatOpen)
    const [messageData, setMessageData] = useState()
    const [limit, setLimit] = useState(60)
    const socket = io.connect('https://momintech-socket-pcigq.ondigitalocean.app')

    const onSendMessageHandler = async () => {
        const message = inputRef.current.value;
        socket.emit("send_message")
        setLimit(limit + 1)
        const data = await sendMessage({ host, userName, message, isAuth })

        if (data === undefined) {
            return
        }
        if (!data.status) {
            alert('Failed to send message')
        }

        inputRef.current.value = ''
        syncGroupMessage()
    }


    const onLoadMoreHandler = async () => {
        setLimit(limit + 30)
        const data = await loadMoreMessage({ limit, host })
        if (data.message) {
            return alert(data.message)
        }
        const reversed = data.chat.reverse();
        setMessageData(reversed)
    }

    const syncGroupMessage = async () => {
            const data = await syncMessage({host, limit})
            if(data.message){
                return
            } 
            const reversed = data.chat.reverse();
            setMessageData(reversed)
    }

    useEffect(() => {
        socket.on("receive_message", () => {
            syncGroupMessage()
        })
    }, []);

    useEffect(() => {
        if (chatMessageDiv) {
            chatMessageDiv.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'auto' });
            });
        }
    }, [toggleChat])

    return (
        <div>
            <div className={`${classes.chatbox} ${toggleChat ? classes.chatboxtrue : classes.chatboxfalse}`}>

                <div className={`${classes.messageBar}`} >
                    <h5 className='pt-2 ps-2'>Momintech - Chat Group</h5>
                    {toggleChat && <ArrowDropDownIcon onClick={() => { dispatch(authActions.toggleChat()) }} className={`me-1 ${classes.dropdown}`} />}
                    {!toggleChat && <ArrowDropUpIcon onClick={() => { dispatch(authActions.toggleChat()); syncGroupMessage(); }} className={`me-1 ${classes.dropdown}`} />}
                </div>

                <div ref={chatMessageDiv} className={classes.messagebox}>

                    {!messageData && <div className="d-flex justify-content-center w-100 mt-2 mb-2"><Button size='sm' variant="warning" onClick={onLoadMoreHandler}>Load More</Button>{' '}</div>}

                    {messageData ? messageData.map((e, i) => {
                        const isTheUser = userName === e.username
                        return <div key={i} className={classes.message} style={{ backgroundColor: isTheUser ? 'white' : 'rgb(145 214 245)', alignSelf: isTheUser ? 'flex-start' : 'flex-end', marginTop: '3px', fontFamily: 'Roboto', lineHeight: '20px', paddingLeft: '7px' }}>
                            {e.message}
                            <div style={{ fontSize: '10px', color: 'grey', fontFamily: 'Zen Dots' }}>
                                by {isTheUser ? 'You' : e.username}
                            </div>
                        </div>
                    }) : <div className="d-flex justify-content-center w-100 mt-2 mb-2"><Button size='sm' variant="success" onClick={syncGroupMessage} >Refresh</Button>{' '}</div>}

                </div>

                {isAuth && <div className={`${classes.input} d-flex justify-content-center align-items-center`}>
                    <Form.Control
                        type="text"
                        ref={inputRef}
                        placeholder="Send Message"
                        style={{ boxShadow: 'none', border: '0', outline: '0', borderRadius: '0' }}
                    />
                    <Button style={{ borderRadius: '0' }} variant="success" onClick={onSendMessageHandler}>Send</Button>{' '}
                </div>}
            </div>
        </div>
    )
}

export default ChatBox