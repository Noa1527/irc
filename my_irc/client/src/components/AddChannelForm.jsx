import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AddChannelForm = ({ channels, setChannels, setIsFormVisible, user, socket, currentChannel }) => {
    const [inputValue, setInputValue] = useState('')

    function handleCancelClick() {
        setIsFormVisible(false)
    }

    function handleSubmitClick() {
        const userId = user.id
        socket.emit("add channel", { name: inputValue, creator: {id: userId, username: user.username}, channel: currentChannel })
        setIsFormVisible(false)
    }

    return (
        <>
            <div className='position-absolute h-50 w-100' style={{zIndex:"10"}}>
                <div 
                    className='rounded h-50 w-50 ms-auto me-auto bg-primary' 
                    style={
                        {
                            backgroundImage: "linear-gradient(60deg, blue, white, red)",
                        }
                    }
                >
                    <h2 className='text-center'>Ajouter un Channel</h2>
                    <div className='h-50 w-75 d-flex flex-column me-auto ms-auto '>
                        <Form.Label  htmlFor='channelName'>Nom du channel : </Form.Label>
                        <Form.Control 
                            className='h-50 w-100' 
                            id='channelName' 
                            type="text" 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder="Enter channel" 
                        />
                    </div>
                    <div className='h-25 w-50  me-auto ms-auto '>
                        <Button className='w-50' variant="outline-primary" onClick={handleSubmitClick}>Ok</Button>
                        <Button className='w-50' variant="outline-danger" onClick={handleCancelClick}>Annuler</Button>
                    </div>
                </div>
            </div>
        </>
    )
} 