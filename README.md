# React: Aplicaciones en tiempo real con Socket-io

### Instalar socket.io en el servidor con node.js y express

```bash
npm i socket.io
npm i express
```

### Crear archivo index.js con socket.io y express

```js
// Servidor express
const app = require('express')

// Servidor socket.io
const server = require('http').createServer(app)

// Configuración de socket.io
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
const PORT = process.env.PORT || 8080
app.get('/', (req, res) => {
  res.send('<h1>Servidor corriendo</h1>')
})
io.on('connection', (socket) => {
  console.log('Usuario conectado', socket.id)
  socket.on('disconnect', () => {
    console.log('Usuario desconectado', socket.id)
  })
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data)
    io.emit('mensaje', data) // Emitir el mensaje a todos los clientes conectados
  })
})
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
```

### Referencias

- [Socket.io](https://cdnjs.com/libraries/socket.io)
