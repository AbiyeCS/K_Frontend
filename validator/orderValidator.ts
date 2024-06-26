import { Order } from "../model/order";

const moment = require('moment'); // You can use moment.js for easy date manipulation

module.exports.validateOrder = function (order: Order): string {
    // Parse the orderDate to ensure it's a valid date object
    const orderDate = moment(order.orderDate, 'YYYY-MM-DD');
    
    // Check if the orderDate is valid
    if (!orderDate.isValid()) {
        return "Invalid order date.";
    }
    
    const oneYearAgo = moment().subtract(1, 'years');
    if (orderDate.isBefore(oneYearAgo)) {
        return "Order cannot be dated back more than a year from the current date.";
    }

    return null;
};