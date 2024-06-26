import { Order } from "../model/order";
import { Customer } from "../model/customer";

const axios = require ('axios');
const orderValidator = require("../validator/orderValidator")

module.exports.getOrders = async function (): Promise<Order[]>  {
    try {
        const response = await axios.get('http://localhost:8080/api/orders')
        console.log("Orders", response.data)
        return response.data
    } catch (e){
        throw new Error('Could not get orders')
    }
}

module.exports.getCustomers = async function (): Promise<Customer[]>  {
    try {
        const response = await axios.get('http://localhost:8080/api/customers')
        console.log("Customers:", response.data)
        return response.data
    } catch (e){
        throw new Error('Could not get customers')
    }
}

module.exports.getOrderById = async function (id: number): Promise<Order>  {
    try {
        const response = await axios.get(`http://localhost:8080/api/order/`+ id)
        return response.data
    } catch (e){
        throw new Error('Could not get order')
    }
}

    module.exports.createOrder = async function (order: Order): Promise<number>{
        const error: string = orderValidator.validateOrder(order)
    
        if(error){
            throw new Error(error);
        }
        
        try {
    
            console.log("Checking order", order);
            const response = await axios.post('http://localhost:8080/api/order', order, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            throw new Error("Could not create order")
        }
}

