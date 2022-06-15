const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


// usando template engine
server.set('view engine',  'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))


//habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

//Session e Cookie
const oneDay = 1000 * 60 * 60 * 24;
server.use(cookieParser());
server.use(sessions({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: true
    })
)



// routes
server.use(routes)

server.listen(4000, () => console.log('rodando'))