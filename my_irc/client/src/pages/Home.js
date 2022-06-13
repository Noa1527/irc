import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import socketIOClient from "socket.io-client";
import isCurrentChannel from '../functions/isCurrentChannel';

const Home = (props) => {
    
    const [pseudo, setPseudo] = useState("");
    const ENDPOINT = "http://127.0.0.1:3000/";
    
    
    const handleLogin = (e, pseudo) => {
        e.preventDefault();
        const socket = socketIOClient(ENDPOINT);
        socket.emit("join server", pseudo)
        socket.on("send user", user => {
            props.setUser(user);
            props.setSocket(socket);
        })
        socket.on("send users", users => {
            props.setUsers(users)
        })
        socket.on("new message", (message) => {
            props.setNewMessages((prev) => [...prev, message])
        })
        socket.on("send channels", (channels) => {
            props.setCurrentChannel((prev) => {
                return isCurrentChannel(prev, channels) ? prev : "general"
            })
            props.setChannels(channels)
        })
        socket.on("channel users", (users) => {
            props.setCurrentChannelUsers(users)
        })
        socket.on("new private message", (message) => {
            props.setNewMessages((prev) => [...prev, message])
        })
        socket.on("send messages", (messages) => {
            props.setMessages(messages)
        })
        socket.on("disconnect user", (user) => {
            props.setCurrentChannelUsers((prev) => prev.filter(elt => elt.id === user.id))
        })
    }
    
    return (
        
    <div className='bg-secondary pt-5 h-100 w-100'>
            <div className='w-50 bg-primary rounded-3 ms-auto me-auto '>
                <h1
                    className='rounded-3 text-darck d-flex align-items-center justify-content-center'
                    style={
                        {
                            backgroundImage: "linear-gradient(60deg, blue, white, red)",
                        }
                    }
                >
                    Messagerie instantaner
                </h1>
            </div>
            <div>
                <div className=' w-50 ms-auto me-auto' style={{marginTop: "200px"}}>
                    <Form  
                        className='pt-3 pb-3 ps-3 pe-3 bg-primary w-100 ms-auto me-auto rounded-3'
                        onSubmit={(e) => handleLogin(e, pseudo)} 
                        id='sign-up-form'
                    >
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-light" >Votre nom d'utilisateur</Form.Label>
                            <Form.Control
                                id='inputID'
                                className='bg-danger text-light ' 
                                type="pseudo"
                                placeholder="Nom d'utilisateur" 
                                onChange={(e) => setPseudo(e.target.value)} 
                                value={pseudo}
                            />
                        </Form.Group>
                        <Button variant="light" type="submit">
                            Se connecter
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Home;