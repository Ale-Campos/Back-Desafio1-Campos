import { Router } from "express"
import ProductManager from "../services/ProductManager.js"

const viewsRouter = Router()

viewsRouter.get("/", (req,res) => {

    let products = ProductManager.getProductManager().getProducts()
    console.log(products)
    res.render('home', {products})
})

viewsRouter.get('/realtimeproducts', (req,res) => {
    let products = ProductManager.getProductManager().getProducts()
    console.log(products)
    res.render('realTimeProducts', {products})
})

viewsRouter.get('/products', async (req,res) => {

    let { limit, page, query, sort } = req.query
    let paginatedProducts = await ProductManager.getProducts(limit || 10, page || 1, query || null, sort)
    let {docs: products} = paginatedProducts
    console.log(paginatedProducts)
    res.render('products', {products, ...paginatedProducts})
})


export default viewsRouter