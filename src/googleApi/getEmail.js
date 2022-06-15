const  axios = require('axios');


module.exports = {
  
  async getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: '498507780649-5rm0es7280phbf52sup6qd4853grrvsu.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:4000/googleValidate',
        grant_type: 'authorization_code',
        code,
      },
    });
   
    return data.access_token;
  },
  async getGoogleUserInfo(access_token) {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  }
}