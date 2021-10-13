
function listOfMonths(data){
    return new Set(
        data.map(d => deleteDay(d.date))
    )//criar objeto de meses distintos
}

function deleteDay(date){
    return date.slice(3)
}

function convertObjectToList(dates){
    return Array.from(dates)
}

function reducePerMonth(dates, data){
    return dates.reduce(
        (list, date) =>{
            list.push(
                {
                    date:date,
                    list:data.filter(
                        (transaction) =>{
                            return deleteDay(transaction.date) == date
                        }
                    )
                }//OBJETO
            )
            return list
        }//percorre todos os meses cadastrados
    ,[])
}

module.exports = {
    extractDataPerMonth(data){
        let dates = listOfMonths(data)

        dates = convertObjectToList(dates)
    
        const listPerMonth = reducePerMonth(dates.sort(), data)
      
        return listPerMonth
    },    
    formatDate(date){
        return date.split('-').reverse().join('-')
    },
    formatDateReplace(date){
        return date.split('-').join("/")
    },
    validateField(req){
        const error = []
        if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
            error.push({description: "* Obrigatório preencher campo descrição!"})
        }
        
        if(req.body.description.length > 50){
            error.push({description:"*Limite de caractere atingido!"})
        }

        if(!req.body["value-transaction"] || typeof req.body["value-transaction"] == undefined || req.body["value-transaction"] == null){
            error.push({"value-transaction": "* Obrigatório preencher campo valor!"})
        }

        if(!req.body.date || typeof req.body.date == undefined || req.body.date == null){
            error.push({date: "* Obrigatório preencher campo data!"})
        }

        if(!req.body.type || typeof req.body.type == undefined || req.body.type == null){
            error.push({type: "* Obrigatório preencher campo tipo!"})
        }

        return error
    },
    typedField(req){        
        const fields = {
            description: req.body.description,
            "value-transaction": req.body["value-transaction"],
            date: req.body.date,
            type: req.body.type,
            category: req.body.category
        }
        return fields
    },
    convertMillisecondsToDate(milliseconds){
        let dateObject = new Date(milliseconds)
        const day = dateObject.getDate() + 00
        const month = dateObject.getMonth() + 01
        const year = dateObject.getFullYear()

        const dayDigits = day < 10 ? "0" + day : day
        const monthDigits = month < 10 ? "0" + month : month

        return  dayDigits + "-" + monthDigits + "-" + year
    },
    convertDateToMilliseconds(date){
        return Date.parse(date + "T12:00Z")
    }

}