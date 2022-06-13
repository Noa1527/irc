const Express = require('express');
const app = Express();
require('dotenv').config({ path: './config/.env' });
const cookieParser = require('cookie-parser');
const Cors = require('cors');
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

// cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    Credential: true,
    'allowedHeaders': ['sessionId', 'contentType'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, PUT, POST, PATCH, DELETE',
    'preflightContinue': false
}

app.use(Cors({ corsOptions }));

//cookie et body parser 
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cookieParser());

let users = []
let messages = {
    general: { messages: [], creator: "çeçqèsqsdèqsqdè" }
}
let privateMessages = {}

let channels = [{name: 'general', creator: 'admin'}]
let timers = {}
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', (socket) => {
    
    socket.on("join server", (username) => {
        const user = { username: username, id: socket.id, messages: {}}
        users.push(user)
        socket.join('general')
        socket.emit("send user", user)
        io.emit("channel users", getUsersOnChannel("general", users))
        io.emit("send users", users)
        socket.emit("new channel", channels)
        io.emit("new message", {sender: "Grand maître administrateur", content: `${username} à rejoint le chat !`});
    })

    socket.on("get messages", (data) => {
        
            const response = [...messages[data.channel].messages, data.channel]
            socket.emit("send messages", response)
    })

    socket.on("get private messages", (data) => {

        let messages = [];
        if (`${data.user.id}${data.receiver.id}` in privateMessages) {
            messages = privateMessages[`${data.user.id}${data.receiver.id}`]
            socket.emit("send messages", privateMessages[`${data.user.id}${data.receiver.id}`])
        } else if (`${data.receiver.id}${data.user.id}` in privateMessages){
            messages = privateMessages[`${data.receiver.id}${data.user.id}`]
            socket.emit('send messages', privateMessages[`${data.receiver.id}${data.user.id}`])
        }
    })

    socket.on("add channel", (data) => {
        timers[data.name] = setChannelCountDown(data.name)
        messages[data.name] = {
            messages: [],
            creator: data.creator.id
        }
        channels = [...channels, {name: data.name, creator: data.creator}]

        io.emit("new message", {sender: "Grand maître administrateur", content: `${data.creator.username} a créé le channel "${data.name}"`});
        io.emit('send channels', channels)
    })

    socket.on("remove channel", (name) => {
        if (name in timers) {
            clearTimeout(timers[name])
            delete timers[name]
        }
        delete messages[name]
        channels = removeChannel(name, channels)
        io.emit('send channels', channels)
        io.emit("new message", {sender: "Grand maître administrateur", content: `Le channel "${name}" a été supprimé par son créateur.`});
    })

    socket.on("join channel", (data) => {
        leaveAllRooms(socket)
        socket.join(data.channel)
        socket.emit("channel users", getUsersOnChannel(data.channel, users))
        io.to(data.channel).emit("new message", {content: `${data.user.username} a rejoint le channel.`, sender: "Grand maître administrateur"})
    })

    socket.on("join conversation", (data) => {
        leaveAllRooms(socket)
        // console.log(data);
        if (!(`${data.sender}${data.receiver}` in privateMessages) && !(`${data.receiver}${data.sender}` in privateMessages)) {
            socket.join(`${data.sender}${data.receiver}`)
            privateMessages[`${data.sender}${data.receiver}`] = ["private"]
        } else if (`${data.sender}${data.receiver}` in privateMessages) {
            socket.join(`${data.sender}${data.receiver}`)
        } else if (`${data.receiver}${data.sender}`) {
            socket.join(`${data.receiver}${data.sender}`)
        }
    })

    socket.on("update user", (data) => {
        let oldUsername = ""
        users.forEach((elt, i) => {
            if (elt.id === data.id) {
                oldUsername = elt.username
                users[i].username = data.username
            }
        })
        io.emit("send users", users)
        io.emit("new message", {sender: "Grand maître administrateur", content: `${oldUsername} est devenu ${data.username}`});
        io.emit("channel users", getUsersOnChannel("general", users))
    })

    socket.on("send a message", ({message, sender, channel }) => {
        if (channel in timers && channel != "general") {
            clearTimeout(timers[channel])
            timers[channel] = setChannelCountDown(channel)
        }
        messages[channel].messages.push({sender: sender.username, content: message})
        io.to(channel).emit("new message", {content:message, sender:sender.username})
    })

    socket.on("send a private message", (message) => {
        
        if (!(`${message.sender.id}${message.receiver.id}` in privateMessages) && !(`${message.receiver.id}${message.sender.id}` in privateMessages)) {
            privateMessages[`${message.sender.id}${message.receiver.id}`] = [{content: message.message, sender: message.sender.username}, "private"]
        } else if (`${message.sender.id}${message.receiver.id}` in privateMessages) {
            privateMessages[`${message.sender.id}${message.receiver.id}`].push({content: message.message, sender: message.sender.username})
            io.to(`${message.sender.id}${message.receiver.id}`).emit("new message", {content: message.message, sender: message.sender.username})
        } else if (`${message.receiver.id}${message.sender.id}`) {
            privateMessages[`${message.receiver.id}${message.sender.id}`].push({content: message.message, sender: message.sender.username})
            io.to(`${message.receiver.id}${message.sender.id}`).emit("new message", {content: message.message, sender: message.sender.username})

        }
    })

    socket.on('disconnect', () => {
        let user = users.find(elt => elt.id === socket.id)
        users = users.filter(user => user.id !== socket.id)
        io.emit("send users", users)
        io.emit("disconnect user", user)
        console.log(socket);
        // io.emit("channel users", getUsersOnChannel("general", users))
    });
});

//port
server.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})













function leaveAllRooms(socket) {
    socket.rooms.forEach((e) => {
        if (e !== socket.id) {
            socket.leave(e)
        }
    }) 
}

function removeChannel(name, channels) {
    let j = null
    channels.forEach((elt, i) => {
        if (elt.name === name) {
            j = i
        }
    })
    channels.splice(j, 1)
    return channels
}

function getUsersOnChannel(name, users) {
    let output = []
    io.sockets.adapter.rooms.get(name).forEach((id) => {
        return users.forEach(user => {
            if (user.id === id) {
                output.push(user)
            }
        })
    })
    return output
}

function setChannelCountDown(name) {
    return setTimeout(() => {
        delete messages[name]
        channels = removeChannel(name, channels)
        io.emit("new message", {sender: "Grand maître administrateur", content: `Le channel "${name}" a été supprimé pour cause d'inactivité.`});
        io.emit('send channels', channels)
    }, 120000);
}


