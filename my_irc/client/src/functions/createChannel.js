const createChannel = (socket, setChannels, channel, user) => {

    if (channel.length > 0) {
        socket.emit("add channel", {
            name: channel, 
            creator: {
                id: user.id, 
                username: user.username
            } 
        })
        setChannels( (prev) => [...prev, {name: channel, creator: user.id}])
    }
}

export default createChannel;