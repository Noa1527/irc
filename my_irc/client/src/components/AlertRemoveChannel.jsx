import React from 'react';
import Button from 'react-bootstrap/Button';

const AlertRemoveChannel = ({ setIsAlertVisible, name, setChannels, socket }) => {

    const handleRefuseClick = () => {
        setIsAlertVisible(false)
    }

    const handleAcceptClick = () => {
        socket.emit("remove channel", name)
        setChannels((prev) => {
            return prev.filter(elt => {
                if (elt.name !== name) {
                    return elt
                }
            })
        })
        setIsAlertVisible(false)
    }
    return (
        <div className='d-flex justify-content-center align-items-center position-absolute h-50 w-100' style={{ zIndex: "10", top:"10px", }}>
            <div
                className=' rounded h-50 w-50 ms-auto me-auto bg-primary'
                style={
                    {
                        backgroundImage: "linear-gradient(60deg, blue, white, red)",
                    }
                }
            >
            <p className='w-50 ms-auto me-auto mt-4'>Si vous supprimez ce channel, tous les messages qu'il contient seront effacés.</p>
            <p className='text-center'>Vous confirmez ?</p>
            <div className='h-25 w-50  me-auto ms-auto '>
                <Button className='w-50' variant="outline-primary" onClick={handleAcceptClick}>Oui</Button>
                <Button className='w-50' variant="outline-danger" onClick={handleRefuseClick}>Non</Button>
            </div>
        </div>
    </div>
    );
};

export default AlertRemoveChannel;