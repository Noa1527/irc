import React from 'react';
import User from './User';

function Users({setMessages, setNewMessages, setCurrentChannel, users, setReceiver, user, socket, currentReceiver }) {
    function renderUsers() {
        return users.map((elt, i) => {
            return (
                <User 
                    key={`channelUser${i}`}
                    setReceiver={setReceiver}
                    receiver={elt}
                    user={user}
                    setCurrentChannel={setCurrentChannel}
                    setMessages={setMessages}
                    setNewMessages={setNewMessages}
                    socket={socket}
                    currentReceiver={currentReceiver}
                />
            )
        })
    }
    
    return (
        <div className='border-bottom mb-3'>
            <p className='fw-bold'>Utilisateurs connectés</p>
            <div style={{height:"210px",overflowY:"scroll"}}>
                {users && renderUsers()}
            </div>
        </div>
    );
}

export default Users;