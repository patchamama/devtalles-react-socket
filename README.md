# React: Aplicaciones en tiempo real con Socket-io

Deploy en: [Servidor propio](http://test.patchamama.com:8081/)

### Instalar socket.io en el servidor con node.js y express

```bash
npm i socket.io
npm i express
```

### Crear archivo index.js con socket.io y express

```javascript
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
  socket.on('mensaje-del-cliente', (data) => {
    console.log('Mensaje recibido:', data)
    io.emit('mensaje-del-servidor', data) // Emitir el mensaje a todos los clientes conectados
  })
})
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
```

Ejemplo de código en el cliente (index.html):

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.js"
  integrity="sha512-8BHxHDLsOHx+flIrQ0DrZcea7MkHqRU5GbTHmbdzMRnAaoCIkZ97PqZcXJkKZckMMhqfoeaJE+DNUVuyoQsO3Q=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
<script>
  const socket = io('http://localhost:8080') // Cambiar al URL del servidor
  socket.on('connect', () => {
    console.log('Conectado al servidor de sockets')
    })
    socket.on('mensaje-del-servidor', (data) => {
      console.log('Mensaje recibido del servidor:', data)
    })
    function enviarMensaje() {
      const mensaje = document.getElementById('mensaje').value
      socket.emit('mensaje-del-cliente', mensaje)
    }

    <input type="text" id="mensaje" placeholder="Escribe tu mensaje aquí">
    <button onclick="enviarMensaje()">Enviar</button>
</script>
```

### Referencias

- [Socket.io](https://cdnjs.com/libraries/socket.io)
