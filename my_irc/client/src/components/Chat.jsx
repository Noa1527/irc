import React, { useEffect, useState } from 'react';
import { Channels } from './Channels';
import UserInfo from './UserInfo';
import Spinner from 'react-bootstrap/Spinner'

const Chat = ({ user, socket }) => {
    const [messages, setMessages] = useState(null)
    const [currentChannel, setCurrentChannel] = useState("general")

    useEffect(() => {

        if (!messages) {
            socket.emit("get messages")
            socket.on("send messages", (messages) => {
                console.log("plop")
                setMessages(messages)
            })
        }
    })

    return (
        <>
            {messages ?
                <Channels
                    currentChannel={currentChannel}
                    setCurrentChannel={setCurrentChannel}
                    messages={messages}
                    setMessages={setMessages}
                    user={user}
                    socket={socket}
                />
                :
                <Spinner animation="border" variant="primary" />
            }
            <UserInfo user={user} socket={socket} />
        </>
    )
}
export default Chat;