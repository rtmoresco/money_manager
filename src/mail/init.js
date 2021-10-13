const transport = require("../mail/config")


transport.sendMail({
        from: "rtmoresco.work@gmail.com",   
        to: "renantrindademoresco@gmail.com",
        subject: "Please confirm your account",
    }
).catch(err => console.log(err));