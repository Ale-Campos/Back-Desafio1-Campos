import express from 'express'
import productRouter from './routes/product.router.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/productos', productRouter)

app.listen(port || 3000, () => console.log(`Server is running on port ${port || 3000}`))
