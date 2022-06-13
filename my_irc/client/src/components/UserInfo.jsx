import React, { useState } from 'react';
import UpdateUserForm from './UpdateUserForm';
import Button from 'react-bootstrap/Button';

function UserInfo({ user, socket, setUser }) {
    const [isFormVisible, setIsFormVisible] = useState(false)

    const handleClick = () => {
        setIsFormVisible(true)
    }

    return (
        <div className='border-top mt-4 mb-5'>
            <div className=' mt-4'>
                <p className='fw-bold fs-5'>Informations personnelles</p>
                <div>
                    <p>Pseudo : <span className='fw-bold text-light'>{user.username}</span></p>
                    <Button
                        style={
                            {
                                backgroundColor: "white",
                                color: "#000",
                            }
                        }
                        onClick={handleClick}
                    >
                        Modifier le pseudo
                    </Button>
                </div>
            </div>
            {isFormVisible &&
                <UpdateUserForm
                    user={user}
                    socket={socket}
                    setUser={setUser}
                    setIsFormVisible={setIsFormVisible}
                />
            }
        </div>
    );
}

export default UserInfo;