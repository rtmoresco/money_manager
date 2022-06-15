const config = require("./config")

const smtpTransport = config()

function mailOptions(toEmail, name, token){
    return {
        from: "rtmoresco.work@gmail.com",
        to: toEmail,
        subject: "Por favor, confirme sua inscrição",
        generateTextFromHTML: true,
        html: `<h1>Confirmação de Email</h1>
               <h2>Olá ${name}</h2>
               <p>Obrigado por se inscrever. Por favor, confirme seu e-mail clicando no seguinte link</p>
              <a href=http://localhost:4000/confirm/${token}> Click Aqui</a>`
    }
}

module.exports = {
    sendMail(toEmail,name, token){
        smtpTransport.sendMail(mailOptions(toEmail, name, token), (error, response) => {
            error ? console.log(error) : console.log("Enviado >>>");
        })

        smtpTransport.close()
    }    
}
