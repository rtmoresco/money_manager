const express = require('express');
const routes = express.Router();


const TransactionController = require('./controllers/TransactionController')
const UserController = require('./controllers/UserController')



routes.get('/', TransactionController.index)

routes.get('/login', UserController.login)

routes.get('/index', (req, res) => {res.redirect("/")})


routes.get('/register', TransactionController.register)
routes.post('/register', TransactionController.create)


routes.get('/edit/:id', TransactionController.show)
routes.post('/edit', TransactionController.update)


routes.post('/delete', TransactionController.delete)

routes.post('/account', UserController.create)




/* API - GET - Json */ 

routes.get('/getUsers',  UserController.getUsers)


module.exports = routes;