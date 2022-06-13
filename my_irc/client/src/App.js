import React, { useState } from 'react';
import Home from './pages/Home'
import Chatting from './pages/Chatting';

const App = () => {

    const [users, setUsers] = useState(null)
    const [user, setUser] = useState(null)
    const [socket, setSocket] = useState(null)
    const [newMessages, setNewMessages] = useState([])
    const [channels, setChannels] = useState([{ name: 'general', creator: 'admin' }])
    const [currentChannelUsers, setCurrentChannelUsers] = useState(null)
    const [messages, setMessages] = useState("");
    const [currentChannel, setCurrentChannel] = useState("general")

    function renderChat() {
        if (socket !== null && user !== null) {
            return <Chatting
                user={user}
                socket={socket}
                newMessages={newMessages}
                channels={channels}
                setChannels={setChannels}
                setNewMessages={setNewMessages}
                setUser={setUser}
                users={users}
                currentChannelUsers={currentChannelUsers}
                messages={messages}
                setMessages={setMessages}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
            />
        } else {
            return (
                <div className="w-100 h-100">
                    <Home 
                        setSocket={setSocket} 
                        setUser={setUser}
                        setChannels={setChannels}
                        setNewMessages={setNewMessages}
                        setUsers={setUsers}
                        setCurrentChannelUsers={setCurrentChannelUsers}
                        setMessages={setMessages}
                        currentChannel={currentChannel}
                        setCurrentChannel={setCurrentChannel}
                     />
                </div>
            )
        }
    }

    return (
        renderChat()
    )
};

export default App;