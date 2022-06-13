import React , {useState} from 'react';
import AlertRemoveChannel from './AlertRemoveChannel';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'

export const Channel = (
    { 
        setReceiver, 
        setNewMessages, 
        currentChannel, 
        user, 
        setCurrentChannel, 
        name, 
        creatorId, 
        setChannels, 
        socket, 
        setMessages
    }
) => {
    
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    
    let color = ""
    if (currentChannel === name) {
        color = "green"
    } else {
        color = "black"
    }

    function handleRemoveButtonClick() {
        setIsAlertVisible(true)
    }
    
    function handleSelectClick() {
        socket.emit("join channel", {channel: name, user: user})
        setCurrentChannel(name)
        setMessages("")
        setNewMessages([])
        setReceiver(null)
    }

    return (
        <div className='d-flex align-items-center'>
            <Button 
                style={
                    {
                        backgroundColor:"white",
                        color:color,
                        marginTop:"3px",
                        marginBottom:"2px"
                    }
                } 
                onClick={handleSelectClick}
            >
                { name }
            </Button>
            {
                user.id === creatorId ? 
                    <div className='bg-danger rounded ms-1' style={{width:"33px", height:"33px"}}>
                        <CloseButton style={{width:"25px", height:"25px"}} onClick={handleRemoveButtonClick} variant="white" />
                    </div> :
                    null
            }
            { isAlertVisible && 
                <AlertRemoveChannel 
                    setIsAlertVisible={setIsAlertVisible} 
                    user={user}
                    setChannels={setChannels}
                    socket={socket}
                    name={name}    //Name of the channel
                />
            }
        </div>
    )
} 