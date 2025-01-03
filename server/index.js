const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')  // For the socket.io connection

// const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT    // Showing this message at the home page of our backend.
    })
})

//api endpoints (All routers are passed collectively)
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{    // change app.listen() to the server.listen()
        console.log("server running at " + PORT)
    })
})
