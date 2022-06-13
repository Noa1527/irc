import React from 'react';

function TitleChat(props) {

    return (
        props.receiver ?
            <h1
                className='text-center rounded-3'
                style={
                    {
                        backgroundImage: "linear-gradient(60deg, blue, white, red)",
                    }
                }
            >Conversation privée avec {props.receiver.username}</h1>
            :
            <h1
                className='text-center rounded-3'
                style={
                    {
                        backgroundImage: "linear-gradient(60deg, blue, white, red)",
                    }
                }
            >{props.currentChannel}</h1>
    );
}

export default TitleChat;