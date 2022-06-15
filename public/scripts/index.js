const linkSection = document.querySelectorAll(".link-section")
const hambuguer = document.querySelector(".nav-icon")
hambuguer.addEventListener("click", displayMobileMenu)

function displayMobileMenu(){
    linkSection.forEach((element,index) => {
        if(!element.classList.contains("active")){
            setTimeout(() => {
                element.classList.toggle("active")
                element.classList.toggle("desactive")
            }, index * 100) 
        }else{
            element.classList.toggle("active")
            element.classList.toggle("desactive")
        } 
    })
    hambuguer.classList.toggle("active")
}



const iconMaximizeList = document.querySelectorAll(".show-data")
const cards = document.querySelectorAll(".cards")

iconMaximizeList.forEach((iconMaximize, index) => {
    iconMaximize.addEventListener("click", () =>{
        iconMaximize.classList.toggle("fa-minus-square")        
        iconMaximize.classList.toggle("fa-plus-square")
        console.log("texto")
        cards[index].classList.toggle("hide")
    })
})


//Botão Flutuante
window.onscroll = function(){
    scrollFunction()
}


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

let btnTop = document.getElementById("myBtn")

btnTop.addEventListener("click", topFunction)

function topFunction(){ 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


/*  Tratando combobox action
________________________________*/




document.getElementById("cbYAction").addEventListener("change", setMonth)

function setMonth(){
    let year = document.getElementById("cbYAction").value

    let listMonth = getMonthFromYear(year)
    completeComboBox(listMonth)

}

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

function deleteMonthfromDate(date){    
    return date.slice(3)// 12-"2021"
}

function deleteYearDate(date){    
    return date.slice(0,2)// "12-"2021
}


function completeComboBox(listMonth){
    let cbMAction = document.getElementById("cbMAction")

    removeOption() //remove todos option anteriores

    for(var i = 0; i < listMonth.length; i++) {
        var month = listMonth[i];
        var element = document.createElement("option");
        element.textContent = month;
        element.value = month;
        
        cbMAction.appendChild(element); 

    }
}

function removeOption(){
    var options = document.querySelectorAll('#cbMAction option')
    options.forEach(op => op.remove())
}


/* Filtro por Ano e mes
______________________*/

document.getElementById("btnSearch").addEventListener("click", filterDate)

function filterDate(){
    let year = document.getElementById("cbYAction").value
    let month = document.getElementById("cbMAction").value
    
    filterElementDate(month, year)
} 


function filterElementDate(month, year){
    let listElement = document.getElementsByClassName("month-year")
    let listElementGroup = document.getElementsByClassName("group-month-year")
    let listCards = document.getElementsByClassName("cards")
    let listCard = document.getElementsByClassName("card")
    
    resetDisplay(listElementGroup,listCards, listCard)
    
    Array.from(listElement).forEach(function(e,i){
        
        if(e.innerText != month + "-" + year){
            listElementGroup[i].style.display = "none"
            listCards[i].style.display = "none"
        }
        
    })    
}


function resetDisplay(listElementGroup,listCards, listCard){
    Array.from(listElementGroup).forEach(function(e){
        if(e.style.display == "none"){
            e.style.display = "flex"
        }
    })

    Array.from(listCards).forEach(function(e){
        if(e.style.display == "none"){
            e.style.display = "block"
        }
    })

    Array.from(listCard).forEach(function(e){
        if(e.style.display == "none"){
            e.style.display = "block"
        }
    })

}
