import React from 'react';
import Button from 'react-bootstrap/Button';

function User(props) {
    
    function handleClick() {
        props.setCurrentChannel("")
        props.setMessages("")
        props.setNewMessages([])
        props.setReceiver(props.receiver)
        props.socket.emit("join conversation", {sender: props.user.id, receiver: props.receiver.id})
    }

    let color;
    if (props.currentReceiver) {
        if (props.receiver === props.currentReceiver) {
            color = "green"
        } else {
            color = "black"
        }
    }

    return (
        <div>
            {
                props.user.id !== props.receiver.id ?
                <Button className='btn-light mb-1' style={{color: color}} onClick={handleClick}>{props.receiver.username}</Button>
                :
                <p>{props.receiver.username}</p>
            }
        </div>
    );
}

export default User;