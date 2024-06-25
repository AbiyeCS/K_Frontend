import { Application, Response, Request } from "express";

const orderService = require('../service/orderService');

module.exports = function(app: Application){
    app.get('/orders', async (req: Request,res: Response) => {
        let data = [];

        try{
            data = await orderService.getOrders()
        } catch(e) {
            console.error(e);
        }

        res.render('list-orders', {orders: data})
    })

    app.get(`/order/:id`, async (req: Request,res: Response) => {
        let data = [];

        try{
            data = await orderService.getOrderById(req.params.id)
        } catch(e) {
            console.error(e);
        }

        res.render('view-order', {order: data})
    })
}