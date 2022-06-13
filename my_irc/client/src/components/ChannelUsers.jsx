import React from 'react';
import User from './User';

function ChannelUsers(
    { 
        setMessages, 
        setNewMessages, 
        setCurrentChannel, 
        currentChannelUsers, 
        currentChannel, 
        setReceiver,
        user, 
        socket, 
        currentReceiver 
    }
) {
    function renderUsers() {
        return currentChannelUsers.map((elt, i) => {
            return (
                <User 
                    key={`channelUser${i}`}
                    setReceiver={setReceiver}
                    receiver={elt}
                    user={user}
                    setMessages={setMessages}
                    setNewMessages={setNewMessages}
                    setCurrentChannel={setCurrentChannel}
                    socket={socket}
                    currentReceiver={currentReceiver}
                />
            )
        })
    }

    return (
        <div className='mt-3 mb-3'>
            <p className='fw-bold'>Utilisateurs sur le channel "<span className='text-light'> {currentChannel} </span>"</p>
            <div style={{height:"150px",overflowY:"scroll"}}>
                {currentChannelUsers && renderUsers()}
            </div>
        </div>
    );
}

export default ChannelUsers;