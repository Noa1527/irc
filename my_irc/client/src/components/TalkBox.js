import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import MessageCard from '../pages/MessageCard';
import Container from 'react-bootstrap/Container'
import TitleChat from './TitleChat';
import handleCommands from '../functions/handleCommads';

const TalkBox = (props) => {
    const [message, setMessage] = useState("")

    function renderMessages() {

        const messages = props.messages.filter(elt => {
            if (typeof elt != 'string') {
                return elt
            }
        })

        return messages.map((message, i) => <MessageCard key={i} message={message} />)
    }

    function renderNewMessages() {
        return props.newMessages.map((message, i) =>
            <MessageCard key={i} message={message} />
        )
    }

    const handlemessage = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            if (message.substring(0, 1) === "/") {
                handleCommands(
                    message, 
                    props.setUser, 
                    props.user, 
                    props.setChannels, 
                    props.setCurrentChannel, 
                    props.channels, 
                    props.setNewMessages, 
                    props.socket, 
                    props.currentChannel, 
                    props.currentChannelUsers, 
                    props.users
                )
            } else {
                if (props.receiver) {
                    props.socket.emit("send a private message", { 
                        message: message, 
                        sender: props.user, 
                        receiver: props.receiver 
                    })

                } else {
                    props.socket.emit("send a message", { 
                        message: message, 
                        sender: props.user, 
                        channel: props.currentChannel 
                    })
                }
            }
            setMessage("")
        }
    }

    return (
        <>
            <div
                style={
                    {
                        width:"100%",
                        height: "9%",
                    }
                }
            >
                <Container fluid className=''>
                    <TitleChat 
                        receiver={props.receiver}
                        currentChannel={props.currentChannel} 
                    />
                </Container>
            </div>
            <ul
                className='mt-1 mb-1 ps-0'
                style={
                    {
                        height: "85%",
                        overflowX: "hiden",
                        overflowY: "scroll"
                    }
                }
            >

                {props.messages.length > 1 ? renderMessages() : null}
                {props.newMessages && renderNewMessages()}

            </ul>
            <div className='mb-2'>
                <Form onSubmit={(e) => handlemessage(e, message)}>
                    <InputGroup className="mb-1">
                        <FormControl
                            style={
                                { 
                                    backgroundImage: "linear-gradient(90deg, blue, #D0D3D4, red)", 
                                }
                            }
                            className=' text-light'
                            placeholder="Envoyez un message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <Button variant="outline-primary" type="submit">
                            Envoyer
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </>
    );
};

export default TalkBox;