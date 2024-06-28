import axios from "axios";
import { Login } from "../model/auth";

module.exports.login = async function(login:Login) {
    try {
        const response = await axios.post('http://localhost:8080/api/login', login)

        return response.data
    } catch (e){
        throw new Error('Could not login')
    }
    
}