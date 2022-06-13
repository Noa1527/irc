const changePseudo = (socket, pseudo, setUser, user) => {

    if (pseudo.length > 0) {
        socket.emit("update user", { username: pseudo, id: user.id })
        setUser((prev) => {
            prev.username = pseudo
            return prev
        })
    }
}

export default changePseudo;