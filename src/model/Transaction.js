const Database = require("../db/config")
const Utils = require("../utils/TransactionUtil")

const dados = [
    {
        id: 1,
        description: "SÁLARIO",
        "value-transaction": 3000,
        date: "09-07-2021",
        type: "Receita",
        category: "Alimentação"
    },
    {
        id: 2,
        description: "CARRO",
        "value-transaction": 1000,
        date: "09-07-2021",
        type: "Despesa",
        category: "Carro"
    },
    {
        id: 3,
        description: "CARRO",
        "value-transaction": 3000,
        date: "09-08-2021",
        type: "Despesa",
        category: "Carro"
    },
    {
        id: 4,
        description: "CARRO",
        "value-transaction": 3000,
        date: "27-07-2021",
        type: "Despesa",
        category: "Carro"
    }
]


module.exports = {
    async get(){
        const db = await Database();

        const transactions = await db.all(`SELECT * FROM transactions`);

        await db.close();


        return transactions.map((transaction) => ({
            id: transaction.id,
            description: transaction.description,
            "value-transaction": transaction.value_transaction,
            date: Utils.convertMillisecondsToDate(transaction.date),
            type: transaction.type,
            category: transaction.category
          }));
    
    },
    async create(newTransaction) {
        const db = await Database()

        await db.run(`INSERT INTO transactions (
        description,
        value_transaction,
        date,
        type,
        category
        ) VALUES (
          "${newTransaction.description}",
          "${newTransaction["value-transaction"]}",
          "${newTransaction.date}",
          "${newTransaction.type}",
          "${newTransaction.category}"
        )`)
    
        await db.close()
    },
    async update(upTransaction) {
        const db = await Database()
    
        await db.run(`UPDATE transactions SET 
        description = "${upTransaction.description}",
        value_transaction = "${upTransaction["value-transaction"]}",
        date = "${upTransaction.date}",
        type = "${upTransaction.type}",
        category = "${upTransaction.category}"
        WHERE id = "${upTransaction.id}"
        `)
    
        await db.close()
      },
      async delete(id) {
        const db = await Database()
    
        const status = await db.run(`DELETE FROM transactions WHERE id = ${id}`)

      
    
        await db.close()

        return new Promise(function(resolve, reject){
            setTimeout(() => {
                if(status.changes != 0)
                    resolve()
                else
                    reject()
            }, 5000);
        })
      }
}

