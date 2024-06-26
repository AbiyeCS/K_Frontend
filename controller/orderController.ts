import { Application, Response, Request } from "express";
import { Order } from "../model/order";

const bodyParser = require('body-parser');
const orderService = require('../service/orderService');

module.exports = function(app: Application){
    
    app.use(bodyParser.json());

    app.get('/orders', async (req: Request,res: Response) => {
        let orders: any[] = [];
        let customers: any[] = [];

        try{
            orders = await orderService.getOrders()
            customers = await orderService.getCustomers()
        } catch(e) {
            console.error(e);
        }

        //Merge orders with customer names
        const customerMap = new Map(customers.map(customer => [customer.id, customer.name]));
        const ordersWithCustomerNames = orders.map(order => ({
            ...order,
            customerName: customerMap.get(order.customerID)
        }));

        console.log("Orders with Customer Names:", ordersWithCustomerNames);

        res.render('list-orders', {orders: ordersWithCustomerNames})
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

    app.get('/add-order', async (req: Request, res: Response) => {
        let customers: any[] = [];

        try{
            customers = await orderService.getCustomers()
        } catch(e) {
            console.error(e);
        }

        res.render('add-order', {customers})
    })

    app.post('/add-order', async (req: Request, res: Response) => {
        let data: Order = req.body
        const data1 = req.body
        console.log("Check req body", data1)
        let id: Number

        try {
            const createdOrder = await orderService.createOrder(data)
            id = createdOrder.id;

            res.redirect('/order/' + id)
        }catch(e){
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-order', req.body)
        }
    })
}