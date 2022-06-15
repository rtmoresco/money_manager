
const Transaction = require("../model/Transaction")
const User = require("../model/user")
const TransactionUtil = require("../utils/TransactionUtil")


module.exports = {        
    async index(req, res){
    
        
        try{
            const user = await User.getIdUser(req.session.userid);

            const transactions = await Transaction.get(user.id)

            const transactionPerMes = TransactionUtil.extractDataPerMonth(transactions) 

            //return res.sendFile(basePath + "index.html") - envia todo arquivo html
            
            return res.render("index", {transactions:transactionPerMes}) //envia o arquivo rendenrizado pelo ejs
        }catch(e){
            return res.send("Erro ao obter dados do banco de dados!")
        }    

    },
    register(req, res){
        const errors = []
        const fields = {}
        res.render("register", {errors, fields})
    },
    async create(req, res){
        const errors = TransactionUtil.validateField(req)
        const fields = TransactionUtil.typedField(req)

        const user = await User.getIdUser(req.session.userid);
     

        if(errors.length > 0){                      
            res.render("register", {errors, fields})
        }else{
            
            //const lastId = data[data.length - 1]?.id || 0
            try{
                await Transaction.create({
                    idUser: user.id,
                    description: req.body.description,
                    "value-transaction": req.body["value-transaction"],
                    date: TransactionUtil.convertDateToMilliseconds(req.body.date),
                    type: req.body.type,
                    category: req.body.category
                })
            
                return res.redirect("/")
            }catch(e){
                return res.send("Erro ao Salvar no Banco de Dados!")
            }
            
        }            
    },
    async show(req, res){
        
        try{
            const user = await User.getIdUser(req.session.userid);

            const transactionId = req.params.id
            const transactions = await Transaction.get(user.id)            
            const transaction = transactions.find(transaction => Number(transaction.id) === Number(transactionId))

            if(!transaction){
                return res.send('Job not found!')
            }
            
            transaction.date = TransactionUtil.formatDate(transaction.date)

            const errors = []
            res.render("transaction-edit", { transaction, errors })
        }catch(e){
            return res.send("Erro ao obter dados do banco de dados!")
        }      
    },
    async update(req, res){

        try{
            const errors = TransactionUtil.validateField(req)

            const transaction = {
                id: req.body.id,
                description: req.body.description,
                "value-transaction": req.body["value-transaction"],
                date: req.body.date,
                type: req.body.type,
                category: req.body.category
            }


            if(errors.length > 0){   
                res.render("transaction-edit", {transaction, errors})
            }else{
                transaction.date = TransactionUtil.convertDateToMilliseconds(transaction.date)
                await Transaction.update(transaction)

                res.redirect("/")
            }
        }catch(e){
            return res.send("Erro ao atualizar o banco de dados!")
        }
        
    },
    async delete(req, res){

        try{
            const id = req.body.modalId
        
            Transaction.delete(id).then(() => res.redirect("/")).catch(() => res.send("Erro ao deletar, tente mais tarde")) 
        }catch(e){
            res.send("Erro ao deletar arquivos!")
        }  

    },
    async getTransactions(req, res){

        try{

            const user = await User.getIdUser(req.session.userid);

            const transactions = await Transaction.get(user.id)

           return res.send(transactions)

        }catch(e){
            return res.send("Erro ao obter dados do banco de dados!")
        } 
    }
    
}