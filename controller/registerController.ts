import { Application, Request, Response } from "express";
import { User } from "../model/user";
const bodyParser = require('body-parser');
const registerService = require('../service/registerService');


module.exports = function(app: Application){
    app.use(bodyParser.json());

    app.get('/register', async (req: Request, res: Response) => {
        res.render('register')
    })

    app.post('/register', async (req: Request, res: Response) => {
        let data: User = req.body

        try {
            await registerService.register(data)
            res.redirect('/login')
        }catch(e){
            console.error(e);

            res.locals.errormessage = e.message

            res.render('login', req.body)
        }
    })
}