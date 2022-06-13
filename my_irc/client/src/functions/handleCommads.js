import changePseudo from "./changePseudo";
import createChannel from "./createChannel";
import deleteChannel from "./deleteChannel";
import joinChannel from "./joinChannel";
import leaveChannel from "./leaveChannel";
import listChannels from "./listChannels";
import displayUsers from "./displayUsers";
import sendPrivateMessage from "./sendPrivateMessage";
import displayHelp from "./displayHelp";
import displayButt from "./displayButt";
import displayHum from "./displayHum";

const handleCommands = (
    message, 
    setUser, 
    user, 
    setChannels, 
    setCurrentChannel, 
    channels, 
    setNewMessages, 
    socket, 
    currentChannel, 
    currentChannelUsers, 
    users
) => {
    let content = message.split(" ")
    const command = content.shift()

    switch (command) {
        case "/nick":
            changePseudo(socket, content[0], setUser, user)
            break;
        case "/list":
            listChannels(socket, channels, content[0], setNewMessages)
            break;
        case "/create":
            createChannel(socket, setChannels, content[0], user)
            break;
        case "/delete":
            deleteChannel(socket, setChannels, content[0], channels, setCurrentChannel, currentChannel)
            break;
        case "/join":
            joinChannel(socket, setCurrentChannel, content[0], channels, user)
            break;
        case "/leave":
            leaveChannel(socket, setCurrentChannel, channels)
            break;
        case "/users":
            displayUsers(currentChannel, currentChannelUsers, setNewMessages)
            break;
        case "/msg":
            const receiver = content.shift()
            const message = content.join(" ")
            sendPrivateMessage(socket, receiver, message, user, users)
            break;
        case "/jeanne":
            displayHelp()
            break;
        case "/eric":
            displayButt()
            break;
        case "/zemmour":
            displayHum()
            break;
        default:
            alert("Commande inexistante")
            break;
    }
}
export default handleCommands;