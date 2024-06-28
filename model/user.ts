export class User {
    username: String
    password: String
    role: 2 
    // Yeah setting roleid in the client side is not as secure as doing it server side
    // Could the role be changed in the dom before being sent to the server side? 
}