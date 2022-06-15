const GooogleConfig = require("../googleApi/config")


const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
}


module.exports = {
    urlGoogle() {
        const auth = GooogleConfig.createConnection(); // this is from previous step
        const url = getConnectionUrl(auth);
        return url;
    }
}


