const displayUsers = (currentChannel, currentChannelUsers, setNewMessages) => {
    let message = { sender: `Liste des utilisateurs sur le channel "${currentChannel}"` }
    let content = ""

    currentChannelUsers.forEach(elt => {
        content += `${elt.username}, `
    })
    content = content.replace(/,\s*$/, "")
    message.content = content
    setNewMessages(prev => [...prev, message])
}

export default displayUsers;