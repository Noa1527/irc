import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Channels } from '../components/Channels';
import TalkBox from '../components/TalkBox';
import LePen from '../assets/img/lePen.png';
import Zemmour from '../assets/img/zemmourrifle.jpeg';
import UserInfo from '../components/UserInfo';
import Users from '../components/Users';
import ChannelUsers from '../components/ChannelUsers';

const Chatting = (
    { 
        currentChannel, 
        setCurrentChannel, 
        messages, 
        setMessages, 
        currentChannelUsers, 
        setNewMessages, 
        channels, 
        setChannels, 
        user, 
        socket, 
        newMessages,
        setUser, 
        users 
    }
) => {
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null)

    useEffect(() => {

        if (!messages) {
            if (!receiver) {
                socket.emit("get messages", { channel: currentChannel, receiver: receiver })
            } else {
                console.log("get private messages")
                socket.emit("get private messages", { user: user, receiver: receiver })
            }
        }
    }, [messages])
    return (
        <Container fluid className='h-100'>
            <Row className='h-100'>
                <Col xs={3} md={2} className='bg-primary h-100'>
                    
                    <div >
                        <Channels
                            currentChannel={currentChannel}
                            setCurrentChannel={setCurrentChannel}
                            setMessages={setMessages}
                            user={user}
                            socket={socket}
                            messages={messages}
                            channels={channels}
                            setChannels={setChannels}
                            setNewMessages={setNewMessages}
                            setReceiver={setReceiver}
                        />
                        <UserInfo
                            user={user}
                            socket={socket}
                            setUser={setUser}
                        />
                    </div>

                    <img src={Zemmour} alt="" style={{ width: "100%", }} />
                </Col>
                <Col xs={6} md={8} className='pb-2 pt-2 h-100 position-relative'>
                    <TalkBox
                        user={user}
                        message={message}
                        setMessage={setMessage}
                        messages={messages}
                        setMessages={setMessages}
                        socket={socket}
                        currentChannel={currentChannel}
                        newMessages={newMessages}
                        setUser={setUser}
                        setChannels={setChannels}
                        channels={channels}
                        setNewMessages={setNewMessages}
                        setCurrentChannel={setCurrentChannel}
                        currentChannelUsers={currentChannelUsers}
                        receiver={receiver}
                        users={users}
                    />
                </Col>
                <Col xs={3} md={2} className='bg-danger h-100'>
                    <Users 
                        users={users} 
                        setReceiver={setReceiver}
                        user={user}
                        setMessages={setMessages}
                        setNewMessages={setNewMessages}
                        setCurrentChannel={setCurrentChannel}
                        socket={socket}
                        />
                    {!receiver &&
                        <ChannelUsers
                            currentChannelUsers={currentChannelUsers}
                            currentChannel={currentChannel}
                            setReceiver={setReceiver}
                            user={user}
                            setMessages={setMessages}
                            setNewMessages={setNewMessages}
                            setCurrentChannel={setCurrentChannel}
                            socket={socket}
                            currentReceiver={receiver}
                        />
                    }
                    <img src={LePen} alt="" style={{ width: "100%", }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Chatting;