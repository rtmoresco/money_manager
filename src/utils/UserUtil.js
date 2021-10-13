const crypto = require("crypto");
const mail = require("../mail/mail")



const encryptionData = {
    algorithm: "aes256",
    codification: "utf8",
    secret: "chaves",
    type : "hex"
};


function comparePassword(password, confirmationPassword){
    return password === confirmationPassword
}

module.exports = {
    cipher(password){
        const encrypt = crypto.createCipher(encryptionData.algorithm, encryptionData.secret);
        encrypt.update(password);

        return encrypt.final(encryptionData.type)
    },
    decipher(password){
        const decrypt = crypto.createDecipher(encryptionData.algorithm, encryptionData.secret);

        decrypt.update(password, encryptionData.type, encryptionData.codification);

        return decrypt.final(encryptionData.codification)
    },
    sendEmail(email, name, token){
        mail.sendMail(email, name, token)
    },
    generateToken(){
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';

        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }

        return token        
    },
    validateField(user){
        const error = []

        if(!user.mail || typeof user.mail == undefined || user.mail == null){
            error.push({mail: "* Obrigatório preenchimento do Email!"})
        }

        if(user.isExistsEmail > 0){
            error.push({isExistsEmail: "* Email Já existe!"})
        }

        if(!user.name || typeof user.name == undefined || user.name == null){
            error.push({name: "* Obrigatório preencher campo Nome!"})
        }

        if(!user.password || typeof user.password == undefined || user.password == null || user.password.length  < 6){
            error.push({password: "* Obrigatório preencher a senha (Minímo 6 didgitos)!"})
        }

        if(!comparePassword(user.password, user.confirmationPassword)){
            error.push({"password-confirm": "* Senha de confirmação diferente !"})
        }


        return error
    },
    typedField(user){ 

        const fields = {
            name: user.name,
            mail: user.mail
        }
        return fields
    }


}