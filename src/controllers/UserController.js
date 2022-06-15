const UserUtil = require("../utils/UserUtil")
const UserModel = require("../model/user")
const initGoogle = require('../googleApi/init')
const GetEmail = require('../googleApi/getEmail');
const e = require("express");

async function validate(req){
    const email = req.body.mail;
    const name = req.body.name;
    const password = req.body.password;
    const passwordConfirm = req.body["password-confirm"];
    
    const isExistsEmail = await UserModel.emailExists(email)
    
    const user = {
        mail:email,
        name:name,
        password: password,
        passwordConfirm: passwordConfirm,
        isExistsEmail: isExistsEmail
    }


    return user;
}


async function apiGoogleSucess(code){
    let state
    try{
        const token = await GetEmail.getAccessTokenFromCode(code)
        const datas = await GetEmail.getGoogleUserInfo(token)
        state = await createAccountGoogle(datas)
    }catch(e){
        state = null
    }

    return state
}

async function createAccountGoogle(datas){    
    let state = {
        data: null,
        erro: false,
        description: ""
    }
   
    if(!datas){
        state.erro = true;
        state.description = "Erro ao Receber Dados do Google"

        return state
    }
    
    let emailExists = await isExistsEmail(datas.email)
    if(emailExists > 0){
        state.erro = true;
        state.description = "Já existe um email cadastrado !";

        return state
    }

    let emailExistsGoogle = await isExistsEmailGoogle(datas.email)
    if(emailExistsGoogle > 0){
        state.data = datas.email
        state.erro = false

        return state
    }

    let stmt = await UserModel.createGoogle({
        email: datas.email,
        name: datas.name,
        type: "google",
        status: "Confirmado"
    })   
    
    if(stmt){
        state.data = datas.email
        state.erro = false

        return state
    }else{
        state.erro = true;
        state.description = "Dados não inserido no banco de dados";

        return state
    }

}

async function isExistsEmail(email){
    const isExistsEmail = await UserModel.emailExists(email)
    return isExistsEmail
}

async function isExistsEmailGoogle(email){
    const isExistsEmail = await UserModel.emailExistsGoogle(email)
    return isExistsEmail
}


function renderPageLogin(res, errors = [], fields = {}, errorLogin=""){
    const linkGoogle = initGoogle.urlGoogle()
    res.render("login", {errors, fields, linkGoogle, errorLogin})    
     
}


module.exports = {    
    async login(req, res){       
        
        let state = {
            erro: true,
            description: "Erro Inesperado"
        }

        if(req.query.code){
            state = await apiGoogleSucess(req.query.code)
        }else{
            renderPageLogin(res)
        }
        
        return state
    },
    async authentication(req, res){
        const login = req.body.login;
        const password = await UserUtil.cipher(req.body.password);  

        const user = await UserModel.getLoginPassaword(login)
        
        let errors=[]
        let fields={}
        
        if(!user){
            errorLogin = "Usuário não está cadastrado !"
            renderPageLogin(res, errors, fields, errorLogin)

            return null
        }

        if(login == user.mail && password == user.password){
            return login;
        }else{
            errorLogin = "Erro no usuário ou senha !"
            renderPageLogin(res, errors, fields, errorLogin)
            return null
        }
    },
    async disconnect(req, res){
        req.session.destroy()
        res.redirect('/');
    },
    async account(req,res){
        const errors = []
        const fields = {}

        const linkGoogle = initGoogle.urlGoogle()

        res.render("account", {errors, fields, linkGoogle})
    },
    async create(req, res){   

        const user = await validate(req)
    
        const errors = UserUtil.validateField(user)
        const fields = UserUtil.typedField(user)
        
        if(errors.length > 0){                    
            return renderPageLogin(res,errors, fields)
        }else{
            let token = UserUtil.generateToken();
            UserUtil.sendEmail(user.mail, user.name, token);

            await UserModel.create({
                email: user.mail,
                name: user.name,
                token: token,
                password: await UserUtil.cipher(user.password),
                status: "Pendente"
            })         
            
            return renderPageLogin(res)
        }
    },
    async createAccountPage(req, res){
        
        const user = await validate(req)
    
        const errors = UserUtil.validateField(user)
        const fields = UserUtil.typedField(user)
        
        if(errors.length > 0){       
            const linkGoogle = initGoogle.urlGoogle()               
            return res.render("account", {errors, fields, linkGoogle})
        }else{
            let token = UserUtil.generateToken();
            UserUtil.sendEmail(user.mail, user.name, token);

            await UserModel.create({
                email: user.mail,
                name: user.name,
                token: token,
                password: await UserUtil.cipher(user.password),
                status: "Pendente"
            })        
            
             return res.redirect("/login")
        }
    },
    async getUsers(req, res){
        const users = await UserModel.get()

        res.send(users)
    },
    async emailConfirm(req, res){
        const token = req.params.token
        UserModel.confirmEmail(token)


        res.redirect("/login")
    }
 
}