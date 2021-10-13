
const Transaction = require("../model/Transaction")
const TransactionUtil = require("../utils/TransactionUtil")


module.exports = {        
    async index(req, res){
        const extract = {
            income: 3000,
            expenses:-200
        }

        const transactions = await Transaction.get()

        const transactionPerMes = TransactionUtil.extractDataPerMonth(transactions) 

        //return res.sendFile(basePath + "index.html") - envia todo arquivo html
       
        return res.render("index", {extract:extract, transactions:transactionPerMes}) //envia o arquivo rendenrizado pelo ejs
    },
    register(req, res){
        const errors = []
        const fields = {}
        res.render("register", {errors, fields})
    },
    async create(req, res){
        const errors = TransactionUtil.validateField(req)
        const fields = TransactionUtil.typedField(req)

        if(errors.length > 0){                      
            res.render("register", {errors, fields})
        }else{
            
            //const lastId = data[data.length - 1]?.id || 0
        
            await Transaction.create({
                description: req.body.description,
                "value-transaction": req.body["value-transaction"],
                date: TransactionUtil.convertDateToMilliseconds(req.body.date),
                type: req.body.type,
                category: req.body.category
            })
        
            return res.redirect("/")
        }            
    },
    async show(req, res){
        const transactionId = req.params.id
        const transactions = await Transaction.get()

        const transaction = transactions.find(transaction => Number(transaction.id) === Number(transactionId))

        if(!transaction){
            return res.send('Job not found!')
        }
        
        transaction.date = TransactionUtil.formatDate(transaction.date)

        const errors = []
        res.render("transaction-edit", { transaction, errors })
    },
    async update(req, res){
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
    },
    async delete(req, res){
        const id = req.body.modalId
        
        Transaction.delete(id).then(() => res.redirect("/")).catch(() => res.send("Erro ao deletar, tente mais tarde"))     

    }
    
}