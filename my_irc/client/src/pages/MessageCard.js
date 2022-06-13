import React from 'react';
import Card from 'react-bootstrap/Card';
import Baguette from '../assets/img/a.jpg'

const MessageCard = (props) => {
    let backgroundImage;
    let color;
    if (props.message.sender) {
        if (props.message.sender === "Grand maître administrateur") {
            backgroundImage = `url(${Baguette})`;
            color = "#000";
        } else {
            backgroundImage = "linear-gradient(90deg, blue, #D0D3D4, red)";
            color = "white";
        }
    }

    return (
        <div className='h-auto'>
            {['Primary'].map((variant) => (
                <Card
                    bg={variant.toLowerCase()}
                    key={variant}
                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                    className="mb-4 ms-4"
                    style={
                        {
                            width: '60%',
                            backgroundImage:backgroundImage,
                            backgroundSize: "100% 100px",
                            fontWeight:'bold',
                        }
                    }
                >
                    <Card.Header style={{color:color}} >{props.message.sender}</Card.Header>
                    <Card.Body>
                        <Card.Text style={{color:color}}>
                            {props.message.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

        </div>
    );
};

export default MessageCard;