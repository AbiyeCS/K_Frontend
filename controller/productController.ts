import { Application, Response, Request } from "express";
import { Product } from "../model/product";
const bodyParser = require('body-parser');

const productService = require('../service/productService');

module.exports = function(app: Application){

    app.use(bodyParser.json()); // It parses incoming requests with JSON payloads and makes the parsed data available under req.body.

    app.get('/products', async (req: Request, res: Response) => {
        let data = Product;

        try{
            data = await productService.getProducts()
        } catch(e) {
            console.error(e);
        }

        res.render('list-products', {products: data})
    })

    app.get(`/product/:id`, async (req: Request, res: Response) => {
        let data = Product

        try{
            data = await productService.getProductsById(req.params.id)
        } catch(e) {
            console.error(e);
        }

        res.render('view-product', {product: data})
    })

    app.get('/add-product', async (req: Request, res: Response) => {
        res.render('add-product')
    })

    app.post('/add-product', async (req: Request, res: Response) => {
        let data: Product = req.body
        const data1 = req.body
        console.log("Check req body", data1)
        let id: Number

        try {
            const createdProduct = await productService.createProduct(data)
            id = createdProduct.id;

            res.redirect('/product/' + id)
        }catch(e){
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-product', req.body)
        }
    })

    // All for sessions gave up doing - cbf at the moment to create all the different view pages to show how sessions/caching works
    // app.get('/add-product-name' , async (req: Request, res: Response) => {
    //     if(!req.session.product){
    //         req.session.product = {}
    //     }
    //     res.render('add-product-name')
    // })

    // app.post('/add-product-name' , async (req: Request, res: Response) => {
    //     req.session.product["name"] = req.body.name;
    //     res.redirect('add-product-description');
    // })

    // app.post('/add-product-description' , async (req: Request, res: Response) => {
    //     req.session.product["description"] = req.body.description;
    //     res.redirect('add-product-price');
    // })

    // app.post('/add-product-description' , async (req: Request, res: Response) => {
    //     req.session.product["description"] = req.body.description;
    //     res.redirect('add-product-price');
    // })
    
}