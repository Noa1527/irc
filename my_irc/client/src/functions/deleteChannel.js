const deleteChannel = (
    socket, 
    setChannels, 
    channel, 
    channels, 
    setCurrentChannel, 
    currentChannel
) => {

    let isChannel = false

    channels.forEach(elt => {
        if (elt.name === channel) {
            isChannel = true
        }
    })
    if (isChannel && channel !== "general") {
        socket.emit("remove channel", channel)
        setChannels((prev) => {
            return prev.filter(elt => {
                if (elt.name !== channel) {
                    return elt
                }
            })
        })
        if (channel === currentChannel) {
            setCurrentChannel("general")
        }
    } else {
        alert(`Impossible de supprimer le channel "${channel}"`)
    }
}

export default deleteChannel;