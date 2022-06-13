const sendPrivateMessage = (socket, receiver, content, user, users ) => {
    const fullReceiver = users.filter(elt => elt.username === receiver)[0]
    if (fullReceiver) {
        socket.emit("send a private message", { 
            message: content, 
            sender: user, 
            receiver: fullReceiver 
        })
    } else {
        alert(`L'utilisateur ${receiver} n'existe pas.`)
    }
}

export default sendPrivateMessage;