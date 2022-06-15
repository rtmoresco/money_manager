const {google} = require('googleapis');


const googleConfig = {
  clientId: '498507780649-5rm0es7280phbf52sup6qd4853grrvsu.apps.googleusercontent.com',
  clientSecret: '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', 
  redirect: 'http://localhost:4000/googleValidate' // url de redirecionamento
};


module.exports = {    
    createConnection(){    
        return new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        );
    }
}