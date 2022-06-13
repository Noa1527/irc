const isCurrentChannel = (currentChannel, channels) => {
    return channels.some(elt => elt.name === currentChannel)
}

export default isCurrentChannel;