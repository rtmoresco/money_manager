let listTransactions  = await fetch("http://192.168.0.103:4000/getTransaction")
                                .then(res => res.json())
                                .then(json => json)
                                .catch(err => err)





let incomeAndexpenses = sumIncomeAndExpense()

let income = document.querySelector(".income-text")
income.textContent = "R$ " + incomeAndexpenses.receita;

let expenses = document.querySelector(".expenses-text")
expenses.textContent = "R$ " + incomeAndexpenses.despesa;

let saldo = document.querySelector(".total-text")
saldo.textContent = "R$ " + (incomeAndexpenses.receita + incomeAndexpenses.despesa);

function sumIncomeAndExpense(){
    
  

    let receita = listTransactions.filter((a) => a.type === 'Receita')
                    .reduce((total, c) => total += c["value-transaction"], 0)

    let despesa = listTransactions.filter((a) => a.type === 'Despesa')
                    .reduce((total, c) => total += c["value-transaction"], 0)
    
    let list = {
        "receita": receita,
        "despesa": - despesa
    }

   

    return list
}