const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

  socket.on('created', (message) => {
    socket.broadcast.emit('created', message)
  })

  // socket.on('notifyAmountPlayer', (name) => {
  //   socket.broadcast.emit('announce', name)
  // })

  // socket.on('startGame', (obj) => {
  //   io.local.emit('gameOn', obj)
  // })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on PORT : ${port} !!`)
})