const leaveChannel = (socket, setCurrentChannel, channels) => {
    socket.emit("join channel", "general")
    setCurrentChannel("general")
}

export default leaveChannel;