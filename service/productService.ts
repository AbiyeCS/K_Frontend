import { Product } from "../model/product";
import axios from "axios";

module.exports.getProducts = async function (): Promise<Product[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/products')
        return response.data
    } catch (e){
        throw new Error('Could not get products')
    }
}

module.exports.getProductsById = async function (id: number): Promise<Product> {
    try {
        const response = await axios.get(`http://localhost:8080/api/product/`+ id)
        return response.data
    } catch (e){
        throw new Error('Could not get product')
    }
}

module.exports.createProduct = async function (product: Product): Promise<number>{
    try {
        // const response = await axios.post('http://localhost:8080/api/product')

        console.log("Checking product", product);
        const response = await axios.post('http://localhost:8080/api/product', product, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data
    } catch (error) {
        throw new Error("Could not create product")
    }

}