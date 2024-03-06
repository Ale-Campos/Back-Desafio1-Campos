const socket = io()

function saludar() {

    socket.emit('message', 'Hola Mundo')
}