import React, { useState } from 'react';
import { Channel } from './Channel';
import { AddChannelForm } from './AddChannelForm';
import Button from 'react-bootstrap/Button';

export const Channels = (
    {
        setReceiver, 
        setNewMessages, 
        setMessages, 
        channels, 
        setChannels, 
        currentChannel, 
        user,
        socket, 
        setCurrentChannel 
    }
) => {
    const [isFormVisible, setIsFormVisible] = useState(false)
    
    function showChannels() {
        return channels.map((elt, i) => {
            // console.log(elt);
            return <Channel
                setChannels={setChannels}
                creatorId={elt.creator.id}
                key={`channel${i}`}
                socket={socket}
                currentChannel={currentChannel}
                setCurrentChannel={setCurrentChannel}
                user={user}
                name={elt.name}
                setMessages={setMessages}
                setNewMessages={setNewMessages}
                setReceiver={setReceiver}
            />
        })
    }

    function handleAddChannelClick() {
        setIsFormVisible(true)
    }
    return (
        <div style={{height:"350px"}} >
            <h2>Channels</h2>

            <div className='h-75' style={{overflowY:"scroll"}}>
                {showChannels()}
            </div>

            <div>
                <Button 
                    style={
                        {
                            backgroundColor:"white",
                            color:"#000",
                        }
                    } 
                    onClick={handleAddChannelClick}
                >
                    Ajouter un channel
                </Button>
            </div>

            {
                isFormVisible &&
                
                <AddChannelForm
                    socket={socket}
                    setIsFormVisible={setIsFormVisible}
                    user={user}
                    setChannels={setChannels}
                    channels={channels}
                    currentChannel={currentChannel}
                />
            }
        </div>
    )
} 