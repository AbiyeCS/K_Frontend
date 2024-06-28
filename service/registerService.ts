import axios from "axios"
import { User } from "../model/user"

module.exports.register = async function(user:User) {
    try {
        const response = await axios.post('http://localhost:8080/api/register', user)

        return response.data
    } catch (e){
        throw new Error('Could not register user')
    }
    
}