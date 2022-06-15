const express = require('express');
const routes = express.Router();


const TransactionController = require('./controllers/TransactionController')
const UserController = require('./controllers/UserController')




function redirectLogin(req, res){
    return res.redirect("/login")
}

routes.get('/', (req, res) => {   
    if(req.session.userid)
        TransactionController.index(req, res)
    else
        redirectLogin(req, res)
})

routes.get('/login', UserController.login)

routes.get('/disconnect', UserController.disconnect)


routes.get('/googleValidate', async (req, res) =>{
    
    let login = await UserController.login(req,res)

    if(!login.erro){
        req.session.userid = login.data
        req.session.save() 
        res.redirect("/")         
    }else{
        res.send(login.description)
    }
})

routes.post('/authentication', async (req, res) => {

        let login = await UserController.authentication(req, res)

        if(login){
            req.session.userid = login   //req.session.userid será utilizado dentro do request     
            req.session.save()
            res.redirect("/")
        }
       
})

//routes.post('/teste', UserController.teste)

routes.get('/index', (req, res) => {res.redirect("/")})


routes.get('/register', (req, res) =>{
    if(req.session.userid)
        TransactionController.register(req, res)
    else
        redirectLogin(req, res)
})
routes.post('/register', TransactionController.create)


routes.get('/edit/:id', (req, res) =>{
    if(req.session.userid)
        TransactionController.show(req,res)
    else
        redirectLogin(req, res)
})
routes.post('/edit', TransactionController.update)


routes.post('/delete', TransactionController.delete)

routes.get('/account', UserController.account)

routes.post('/account', UserController.create)
routes.post('/accountPage', UserController.createAccountPage)


//Confirmar email
routes.get('/confirm/:token', UserController.emailConfirm)




/* API - GET - Json */ 

routes.get('/getUsers',  UserController.getUsers)

routes.get("/getTransaction", TransactionController.getTransactions)


module.exports = routes;