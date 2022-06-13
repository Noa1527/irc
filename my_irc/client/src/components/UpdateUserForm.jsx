import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateUserForm({ setIsFormVisible, socket, user, setUser }) {
    const [inputValue, setInputValue] = useState('')

    const handleUpdateUser = () => {
        socket.emit("update user", { username: inputValue, id: user.id })
        setUser((prev) => {
            prev.username = inputValue
            return prev
        })
        setInputValue('')
        setIsFormVisible(false)
    }

    const handleCancelClick = () => {
        setInputValue('')
        setIsFormVisible(false)
    }

    return (
        <div className='position-absolute h-50 w-100' style={{ zIndex: "10" }}>
            <div
                className='rounded h-50 w-50 ms-auto me-auto bg-primary'
                style={
                    {
                        backgroundImage: "linear-gradient(60deg, blue, white, red)",
                    }
                }
            >
                <h2 className='text-center'>Changement du nom d'utilisateur</h2>
                <div className='h-50 w-75 d-flex flex-column me-auto ms-auto '>
                    <Form.Label htmlFor='userName'>Nouveau nom : </Form.Label>
                    <Form.Control className='h-50 w-100' id='userName' type="text" onChange={(e) => setInputValue(e.target.value)} placeholder="Enter channel" />
                </div>
                <div className='h-25 w-50  me-auto ms-auto '>
                    <Button className='w-50' variant="outline-primary" onClick={handleUpdateUser}>Modifier</Button>
                    <Button className='w-50' variant="outline-danger" onClick={handleCancelClick}>Annuler</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserForm;