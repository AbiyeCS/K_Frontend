import { Order } from "../model/order";

const axios = require ('axios');

module.exports.getOrders = async function (): Promise<Order[]>  {
    try {
        const response = await axios.get('http://localhost:8080/api/orders')
        console.log("Orders", response.data)
        return response.data
    } catch (e){
        throw new Error('Could not get orders')
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