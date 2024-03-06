import express from 'express'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import __dirname from './utils/dirname.js'
import path from 'path'
import viewsRouter from './routes/views.router.js'

const app = express()
const port = 8080
let io

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', (req, res, next) =>{
    req.io = io
    next()
} ,productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

//Motor de plantillas

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname + '/../views'))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname + '/../public')))


const httpServer = app.listen(port || 3000, () => console.log(`Server is running on port ${port || 3000}`))

io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('Nuvo Cliente Conectado')
    socket.on('message', (data) => {
        console.log(data)
    })
})
