const { dns } = require("googleapis/build/src/apis/dns");
const Database = require("../db/config")



module.exports = {
    async get(){
        const db = await Database();

        const users = await db.all(`SELECT * FROM users`);

        await db.close();

        return users.map((user) => ({
            mail: user.mail
          }))
    
    },
    async getIdUser(login){
      const db = await Database();

      const user = await db.all(`SELECT 
      id 
      FROM users 
      WHERE mail = "${login}"`);

      await db.close() 

      return user[0]
    },
    async getLoginPassaword(login){
      const db = await Database();
      const user = await db.all(`SELECT 
      mail, 
      password 
      FROM users 
      WHERE mail = "${login}" and type = "local" and status = "Confirmado"`);

      await db.close() 

      
      return user[0]
    },
    async create(newUser) {
        const db = await Database()

        await db.run(`INSERT INTO users (
        mail,
        name,
        token,
        type,
        password,
        status
        ) VALUES (
          "${newUser.email}",
          "${newUser.name}",
          "${newUser.token}",
          "local",
          "${newUser.password}",
          "${newUser.status}"
        )`)  //local é inserido para difirenciar usuários do google api
    
        await db.close()
    },
    async createGoogle(newUser) {
      const db = await Database()

      let state = await db.run(`INSERT INTO users (
      mail,
      name,
      type,
      status
      ) VALUES (
        "${newUser.email}",
        "${newUser.name}",
        "${newUser.type}",
        "${newUser.status}"
      )`)
  
      await db.close()

      return state
    },
    async emailExists(email){

        try{
            const db = await Database()
            const numberRegister = await db.all(`SELECT COUNT(*) as number FROM users WHERE mail = "${email}" and type = "local"`)

            await db.close()                 

            return new Promise(function(resolve, reject){
                if(numberRegister[0] != null || numberRegister[0] != undefined)
                  resolve(numberRegister[0].number)
                else
                  reject()
            })
            
        }catch(error){
          console.log("Deu Erro")
        }      
    },
    async emailExistsGoogle(email){

      try{
          const db = await Database()
          const numberRegister = await db.all(`SELECT COUNT(*) as number FROM users WHERE mail = "${email}" and type = "google"`)

          await db.close()                 

          return new Promise(function(resolve, reject){
              if(numberRegister[0] != null || numberRegister[0] != undefined)
                resolve(numberRegister[0].number)
              else
                reject()
          })
          
      }catch(error){
        console.log("Deu Erro")
      }      
    },
    async confirmEmail(token){
      const db = await Database()

      await db.run(`UPDATE users SET 
        status = "Confirmado",
        token = ""
        WHERE token = "${token}"
      `)

      await db.close()   

    }
}