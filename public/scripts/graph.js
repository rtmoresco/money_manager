let listTransactions  = await fetch("http://192.168.0.103:4000/getTransaction")
                                .then(res => res.json())
                                .then(json => json)
                                .catch(err => err)


                
//Popular ComboBox

let years = convertObjectToList(listOfYear())
years = years.sort(compareTo)

function compareTo(a, b){
    return b - a;
}

//carregar combobox
loadComboBox(years)

function convertObjectToList(dates){
    return Array.from(dates)
}


function listOfYear(){
    return new Set(
        listTransactions.map(d => deleteDayMonth(d.date))
    )//criar objeto de meses distintos
}


function loadComboBox(years){
    let cbYears = document.getElementById("cbYears")
    let cbYearsAction = document.getElementById("cbYAction")


    for(var i = 0; i < years.length; i++) {
        var year = years[i];
        var element = document.createElement("option");
        element.textContent = year;
        element.value = year;
        
        cbYears.appendChild(element); //Adiciona o Ano combobox da pagina do gráfico
    
    }

    for(var i = 0; i < years.length; i++) {
        var year = years[i];
        var element = document.createElement("option");
        element.textContent = year;
        element.value = year;
        
        cbYearsAction.appendChild(element); //Adiciona o Ano combobox da pagina de transações
    }

    setMonth()
}

//Funçóes copiadas do arquivo index.js
function setMonth(){
    let year = document.getElementById("cbYAction").value

    let listMonth = getMonthFromYear(year)
    completeComboBox(listMonth)

}
//Funçóes copiadas do arquivo index.js
function getMonthFromYear(year){
    let listMont = Array();
    let listMonthYear = document.getElementsByClassName("month-year")

    for(let i = 0; i < listMonthYear.length; i++){
        let innerText = deleteMonthfromDate(listMonthYear[i].innerText) 
        if(innerText == year)
            listMont.push(deleteYearDate(
                listMonthYear[i].innerText
            ))
    }
    
    return listMont
}
//Funçóes copiadas do arquivo index.js
function deleteYearDate(date){    
    return date.slice(0,2)// "12-"2021
}
//Funçóes copiadas do arquivo index.js
function deleteMonthfromDate(date){    
    return date.slice(3)// 12-"2021"
}

//Funçóes copiadas do arquivo index.js
function completeComboBox(listMonth){
    let cbMAction = document.getElementById("cbMAction")

    for(var i = 0; i < listMonth.length; i++) {
        var month = listMonth[i];
        var element = document.createElement("option");
        element.textContent = month;
        element.value = month;
        
        cbMAction.appendChild(element); 

    }
}


function deleteDayMonth(date){
    return date.slice(6) // "15-12-"2021
}


//Fim combobox







//Gráfico
getYear()

document.getElementById("cbYears").addEventListener("change", getYear)


function getYear(){
    let year = document.getElementById("cbYears").value
    
    let monthOfYear = filterTransactionYear(year)
  
    let incomeExpensePerMonth = sumIncomeExpensePerMonth(monthOfYear)


    let renda = treatmentData(incomeExpensePerMonth)

    if(document.getElementById("svgGraph"))
        document.getElementById("svgGraph").remove()
    
    createGraph(renda)
}

function filterTransactionYear(year){
    
    let listTransaction = listTransactions.filter(
        (transaction) => {
            return deleteDayMonth(transaction.date) == year
        }
    );
    return convertObjectToList(listOfMonth(listTransaction))
}

function listOfMonth(listTransaction){
    return new Set(
        listTransaction.map(d => deleteDay(d.date))
    )//criar objeto de meses distintos
}

function sumIncomeExpensePerMonth(monthOfYear){
    let sumIncomeExpensePerMonth = monthOfYear.reduce(
        (listIncomeExpense, date) => {                 

            listIncomeExpense.push(
                [date, sumIncomeAndExpense(date)]
            )
            return listIncomeExpense
        },
        []
    )
    
    return sumIncomeExpensePerMonth 
}

function sumIncomeAndExpense(date){
    
    let lt = listTransactions.filter(
        (transaction) =>{
            return deleteDay(transaction.date) == date
        }
    )


    let receita = lt.filter((a) => a.type === 'Receita')
                    .reduce((total, c) => total += c["value-transaction"], 0)

    let despesa = lt.filter((a) => a.type === 'Despesa')
                    .reduce((total, c) => total += c["value-transaction"], 0)
    
    let list = {
        "receita": receita,
        "despesa": - despesa
    }

    return list
}

function deleteDay(date){
    return date.slice(3) // "15-12-"2021
}



function treatmentData(incomeExpensePerMonth){
   

    let monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro", "Novembro", "Dezembro")


    for(let i = 0; i < monName.length; i++){
        for(let j = 0; j < incomeExpensePerMonth.length; j++){            
            let month = deleteYearfromDate(incomeExpensePerMonth[j][0])
                       
            if(i+1 == month){
                incomeExpensePerMonth[j][0] = monName[i] 
            }            
        }        
    }

    return incomeExpensePerMonth
}

function deleteYearfromDate(date){
    
    return date.slice(0,2)// "15-12-"2021
}


function createGraph(renda){

    let rendaMensais = {
        "janeiro": {
            "receita":700,
            "despesa":-10
        },
        "fevereiro": {
            "receita":700,
            "despesa":-100
        },
        "março": {
            "receita":700,
            "despesa":-500
        },
        "abril": {
            "receita":900,
            "despesa":-500
        },
        "junho": {
            "receita":200,
            "despesa":-500
        },
        "julho": {
            "receita":1000,
            "despesa":-800
        }	
    };


    let margin = {
        "top": 40,
        "left": 40,
        "right": 70,
        "bottom": 40
    };

    let box = document.querySelector('#graph');

    

    let w = box.offsetWidth
    let h = window.screen.height /2

    //###################################################

    //let renda = converterArray(rendaMensais);

    function converterArray(renda){
        return Object.entries(renda);
    }

    //###################################################

    let rendaReceitasDespezas = extrairReceitasDespezas(renda);
    let receitas = rendaReceitasDespezas[0]; 
    let despesas = rendaReceitasDespezas[1]; 

    let lucros = gerarLucrosPorMes(renda);

    //###################################################

    function extrairReceitasDespezas(renda){				
        let rendaMensal = null;

        rendaMensal = receitaDespesaPorMes(renda);
        return rendaMensal;
    }

    function receitaDespesaPorMes(rendaMensal){
        let receitas = Array();
        let despesas = Array();

        for(var i = 0; i < rendaMensal.length; i++){
            
            let mes = rendaMensal[i][0];
            let receita = rendaMensal[i][1].receita;
            let despesa = rendaMensal[i][1].despesa;

            receitas.push([mes,receita]);
            despesas.push([mes, despesa]);
        }

        return [receitas, despesas];
    }


    function gerarLucrosPorMes(rendaMensal){
        let lucros = Array();

        for(var i = 0; i < rendaMensal.length; i++){
            let mes = rendaMensal[i][0];
            let lucro = rendaMensal[i][1].receita - (- rendaMensal[i][1].despesa);

            lucros.push([mes,lucro]);

        }

        return lucros;
    }

    //###################################################


    let svg = null;

    svg = gerarSVG(w, h);



    svg = criarBarraReceitas(svg);
    svg = criarBarraDespesas(svg);

    svg = criarEixoY(svg);
    svg = criarEixoX(svg);
    svg = criarEixoCentral(svg);
    svg = criarLinhasIntermediaria(svg)

    svg = gerarLinhasLucros(svg);
    svg = criarCirculoLucro(svg);

    let rotulo = gerarRotulo();
    svg = gerarAreaSelecao(svg);




    //###################################################

    function gerarSVG(largura, altura){

        let svgEscopo = d3.select("#graphic")
                .append("svg")
                .attr("id", "svgGraph")
                .attr("width",largura)
                .attr("height",altura);

        return svgEscopo;
    }


    //###################################################

    function criarBarraReceitas(svg){
        svg.selectAll(".receitas")
            .data(receitas)
            .enter()
                .append("rect")
                .attr("class", "receitas")
                .attr("x", function(d){
                    return dominioEscalaEixoX(d[0]);
                })
                .attr("y", function(d){
                    return dominioEscalaEixoY(d[1]);
                })
                .attr("width", dominioEscalaEixoX().bandwidth())
                .attr("height", function(d){
                    return dominioEscalaEixoY(0) - dominioEscalaEixoY(d[1]);
                });

        return svg;
    }

    function criarBarraDespesas(svg){
        
        svg.selectAll(".despesas")
            .data(despesas)
            .enter()
                .append("rect")
                .attr("class", "despesas")
                .attr("x", function(d){
                    return dominioEscalaEixoX(d[0]);
                })
                .attr("y", function(d){
                    return dominioEscalaEixoY(0);
                })
                .attr("width", dominioEscalaEixoX().bandwidth())
                .attr("height", function(d){
                    return dominioEscalaEixoY(d[1]) - dominioEscalaEixoY(0);
                })
        return svg;
    }

    function dominioEscalaEixoY(dados = null){
        let valorMaximo = d3.max(receitas, d => d[1]);
        let valorMinimo = d3.min(despesas, d => d[1]);

        let yScale = d3.scaleLinear()
                .domain([valorMinimo,valorMaximo])
                .range([h - margin.bottom, margin.top - 0]);

        return dados == null ? yScale : yScale(dados);
    }


    function dominioEscalaEixoX(dados = null){
        
        let xScale = d3.scaleBand()
                .domain(renda.map(d => d[0]))
                .rangeRound([margin.right, w - margin.left])
                .paddingInner(0.5)
                .paddingOuter(0.25);
        
        return dados == null? xScale : xScale(dados);
    }



    //###################################################

    function criarEixoY(svg){
        svg.append("g")
        .attr("transform", "translate(" + margin.right + ", 0)")
        .call(gerarEixoEscalaY());

        return svg;
    }

    function gerarEixoEscalaY(){

        let yAxis = d3.axisLeft()
                .scale(dominioEscalaEixoY())
                .ticks(8);

        return yAxis;
    }


    //###################################################

    function criarEixoX(svg){
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - margin.bottom) + ")")
            .call(gerarEscalaEixoX())

        return svg;
    }


    function gerarEscalaEixoX(){

        let xAxis = d3.axisBottom()
                .scale(dominioEscalaEixoX())
                .tickSizeOuter(10);

        return xAxis;
    }


    //###################################################
            
    function criarEixoCentral(){
        svg.append("line")
            .attr("x1", margin.right - 0)
            .attr("x2", w - margin.left)
            .attr("y1", dominioEscalaEixoY(0))
            .attr("y2", dominioEscalaEixoY(0))
            .attr("stroke", "#3a403d")
            .attr("stroke-width", "2px");

        return svg;
    }

    //###################################################

    function criarLinhasIntermediaria(svg){
        svg.append("g")
            .attr("class", "axisLinhas")
            .attr("transform", "translate(" + margin.right + ", 0)")
            .call(tamanhoCadaLinha());

        return svg;
    }

    function tamanhoCadaLinha(){
        let yAxis = d3.axisLeft()
                .scale(dominioEscalaEixoY())
                .ticks(8)
                .tickSize(-w + (margin.left + margin.right), 0, 0)
                .tickFormat('');

        return yAxis;
    }


    //###################################################



    function gerarLinhasLucros(svg){
        svg.append("path")
            .datum(lucros)
            .attr("class","path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", (13 - lucros.length))
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", configurarDominioLinhas());

        return svg;	
    }


    function configurarDominioLinhas(){
        let line = d3.line()
                .x(d => dominioEscalaEixoX(d[0]) + dominioEscalaEixoX().bandwidth()/2)
                .y(d => dominioEscalaEixoY(d[1]));

        return line;
    }


    //###################################################


    function criarCirculoLucro(svg){
        
        svg.selectAll("circle")
            .data(lucros)
            .enter()
                .append("circle")
                .attr("class", "circle")
                .attr("fill", "purple")
                .attr("cx", function(d){
                    return dominioEscalaEixoX(d[0]) 
                            + 
                        dominioEscalaEixoX().bandwidth()/2;
                })
                .attr("cy", function(d) {
                    return dominioEscalaEixoY(d[1]);
                })
                .attr("r", (14 - lucros.length));

        return svg;
    }


    //###################################################

    function gerarAreaSelecao(svg){
        svg.selectAll("selecao")
            .data(renda)
            .enter()
                .append("rect")
                .attr("class", "selecao")
                .attr("x", function(d, i){
                    return dominioEscalaSelecao(i);
                })
                .attr("y", margin.top)
                .attr("width", (w - (margin.right + margin.left))/renda.length)
                .attr("height", h - margin.bottom)
                .on("mouseover", function(d){
                        rotulo.transition()
                            .duration(100)
                            .style("opacity", 0.9)
                        rotulo.html("<strong>Mês:"+ d[0] + " </strong></br>"
                            + "<label>Ganho:</label> R$ " + d[1].receita + "</br>"
                            + "<label>Perda:</label> R$ " + (- d[1].despesa) + "</br>"
                            + "<label>Lucro:</label> R$ " + (d[1].receita - (-d[1].despesa)) + "</br>")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top",(d3.event.pageY) + "px")
                            
                })
                .on("mouseout", function(d){
                    rotulo.transition()
                        .duration(200)
                        .style("opacity", 0)
                })
    }


    function dominioEscalaSelecao(valor){

        let xScale = d3.scaleLinear()
                .domain([0,renda.length])
                .range([margin.right + 0,w - margin.left]);

        return xScale(valor);
    }

    function gerarRotulo(){			

        let	rotuloBarras = d3.select("body").append("div")
                .attr("class", "rotuloBarras")
                .style("opacity", 0);

        return rotuloBarras;
    }


}