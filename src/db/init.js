const Database = require("./config")

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            value_transaction FLOAT,
            date DATETIME,
            type TEXT,
            category TEXT
        )`)

        await db.run(`INSERT INTO transactions (
            description, 
            value_transaction, 
            date, 
            type, 
            category
            ) VALUES (
                "SÁLARIO",
                3000,
                1617514376018,
                "Receita",
                "Alimentação"
            );
        `)


        await db.exec(`CREATE TABLE users (
            mail TEXT PRIMARY KEY,
            name TEXT,
            token TEXT,
            password TEXT,
            status text,
            id_transaction INTEGER
        )`)


        await db.close()

    }
}
    

initDb.init()



