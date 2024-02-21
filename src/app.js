import express from 'express'
import ProductManager from './products/ProductManager.js'

const app = express()
const port = 3000

app.get('/', (req, res) => { 
    res.send('Hello World')
})

app.get('/productos', (req, res) => {

    let { limit } = req.query
    let productos = ProductManager.getProductManager().getProducts()

    if(limit === undefined) {
        return res.status(200).json(productos)
    } else if (isNaN(parseInt(limit))) {
        return res.status(400).json({error: 'Invalid limit'})
    } else {
        return res.status(200).json(productos.slice(0, parseInt(limit)))
    }
})

app.get('/productos/:pid', (req, res) => {

    let {pid} = req.params

    if(pid === undefined || isNaN(parseInt(pid))) {
        return res.status(400).json({error: 'Invalid ID'})
    }
    let producto = ProductManager.getProductManager().getProductByID(pid)

    if(producto === undefined) {
        return res.status(404).json({error: 'Product not found'})
    }

    return res.status(200).json(producto)

})

app.listen(port || 3000, () => console.log(`Server is running on port ${port || 3000}`))
