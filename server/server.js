const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const messageRoute = require('./routes/messageRoutes')
const socket = require('socket.io')
require('dotenv').config();
const app = express()


mongoose.connect(process.env.DATABASE).then(() => {
    console.log('DB connected')
}).catch((err) => {
    console.log('DB', err)
})
//Apply MiddleWare.
app.use(cors())
app.use(express.json())
//import routes
//const userRoute = require('./routes/UserRoutes.js')

//Using routes
app.use('/api/auth/', userRoute)
app.use('/api/messages/', messageRoute)
const port = process.env.PORT || 8080

const server = app.listen(`${port}`, function (req, res) {
    console.log("App is running", port)
})
const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userid) => {
        console.log('userId',userid)
        onlineUsers.set(userid, socket.id)
    })
    socket.on("send-msg", (data) => {
        console.log('data',data)
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
      });
})