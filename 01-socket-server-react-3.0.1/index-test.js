// Servidor express
const express = require('express')
const app = express()

// Servidor socket.io
const server = require('http').createServer(app)

// Configuración de socket.io
const io = require('socket.io')(server)
// const { Server } = require('socket.io')
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// })

// Desplegar el directorio público
app.use(express.static(__dirname + '/public'))

// Puerto de conexión
const PORT = process.env.PORT || 8080
// app.get('/', (req, res) => {
//   res.send('<h1>Servidor corriendo</h1>')
// })
io.on('connection', (socket) => {
  console.log('Usuario conectado', socket.id)
  // socket.emit('mensaje-bienvenida', 'Bienvenido al servidor')
  // socket.emit('mensaje-bienvenida', {
  //   mensaje: 'Bienvenido al servidor',
  //   id: socket.id,
  //   fecha: new Date(),
  // })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado', socket.id)
  })
  socket.on('mensaje-cliente', (data) => {
    console.log('Mensaje recibido:', data)
    // io.emit('mensaje', data) // Emitir el mensaje a todos los clientes conectados
  })

  socket.on('mensaje-to-server', (data) => {
    console.log('Mensaje recibido:', data)
    io.emit('mensaje-from-server', data) // Emitir el mensaje a todos los clientes conectados
    // socket.emit('mensaje-from-server', data) // Emitir el mensaje solo al cliente que lo envió
  })
})
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
