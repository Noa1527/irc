const joinChannel = (socket, setCurrentChannel, channel, channels, user) => {
    let isChannel = false

    channels.forEach(elt => {
        if (elt.name === channel) {
            isChannel = true
        }
    })

    if (isChannel) {
        socket.emit("join channel", {channel: channel, user: user})
        setCurrentChannel(channel)
    } else {
        alert(`Impossible de rejoindre le channel "${channel}"`)
    }
}

export default joinChannel;