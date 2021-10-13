const UserUtil = require("../utils/UserUtil")
const UserModel = require("../model/user")




module.exports = {    
    login(req, res){
        const errors = []
        const fields = {}
        res.render("login", {errors, fields})
    },
    async create(req, res){   

        const email = req.body.mail;
        const name = req.body.name;
        const password = UserUtil.cipher(req.body.password);
        const passwordConfirm = UserUtil.cipher(req.body["password-confirm"]);
        const isExistsEmail = await UserModel.emailExists(email)
        
        
        const user = {
            mail:email,
            name: name,
            password: password,
            passwordConfirm: passwordConfirm,
            isExistsEmail: isExistsEmail
        }


    
        const errors = UserUtil.validateField(user)
        const fields = UserUtil.typedField(user)
        
        if(errors.length > 0){                      
            return res.render("login", {errors, fields})
        }

        let token = UserUtil.generateToken();
        //UserUtil.sendEmail(email, name, token);

        await user.create({
            email: email,
            name: name,
            token: token,
            password: password,
            status: "Pendente"
        })        
        
       return res.render("login")
    },
    async getUsers(req, res){
        const users = await UserModel.get()

        res.send(users)
    }
 
}