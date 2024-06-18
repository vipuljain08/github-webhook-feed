const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
app.use(bodyParser.json()) // For parsing applicatio/json
const server = http.createServer(app)
const io = socketIO(server)

// Defined endpoints for Github Webhooks
app.post("/webhook", (req, res) => {
    const event = req.body;
    // Check for push event
    if(event && event.pusher) {
        console.log(event);
        io.emit("new_commit", event)
    }
    res.status(200).end()
})

// Serve the client HTML file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    console.log("A user connected");
})

server.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})