const nodemailer = require("nodemailer");
const { google } = require("googleapis");


const OAuth2 = google.auth.OAuth2;



const oauth2Client =  new OAuth2 ( 
    "498507780649-vuvjfjajgsjg65m29t3jr8ipo1a0v7he.apps.googleusercontent.com",
    "NtbXaN9KjTlXH-z8SV-prOr3", 
    "https://developers.google.com/oauthplayground"
);

const refreshToken = "1//04Ah2G1LmzmvnCgYIARAAGAQSNwF-L9IrP5mg1a627LZaTtkgSCAvoDs8lqQ_Mxwd36Z6SGgBuBJw0PSWG4d16bJMecN_lvyEtVk";

oauth2Client.setCredentials({
    refresh_token: refreshToken
});


const accessToken = oauth2Client.getAccessToken()



module.exports = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "rtmoresco.work@gmail.com", 
         clientId: "498507780649-vuvjfjajgsjg65m29t3jr8ipo1a0v7he.apps.googleusercontent.com",
         clientSecret: "NtbXaN9KjTlXH-z8SV-prOr3",
         refreshToken: refreshToken,
         accessToken: accessToken
    }
});






