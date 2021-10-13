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
    async create(newUser) {
        const db = await Database()

        await db.run(`INSERT INTO users (
        mail,
        name,
        token,
        password,
        status
        ) VALUES (
          "${newUser.email}",
          "${newUser.name}",
          "${newUser.token}",
          "${newUser.password}",
          "${newUser.status}"
        )`)
    
        await db.close()
    },
    async emailExists(email){

        try{
            const db = await Database()
            const numberRegister = await db.all(`SELECT COUNT(*) as number FROM users WHERE mail = "${email}"`)

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
      
    }
}