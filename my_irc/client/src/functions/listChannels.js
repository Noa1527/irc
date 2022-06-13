const listChannels = (channels, needle, setNewMessages) => {
    let list = []
    let message = {sender: "Liste des channels"}
    let content = ""

    if (needle) {
        channels.forEach(elt => {
            if (elt.name.includes(needle)) {
                list.push(elt.name)
            }
        })
        list.forEach(word => content += `${word}, `)
    } else {
        channels.forEach(elt => {
            content += `${elt.name}, `
        })
    }
    content = content.replace(/,\s*$/, "")
    message.content = content
    
    setNewMessages(prev => [...prev, message])
}

export default listChannels;