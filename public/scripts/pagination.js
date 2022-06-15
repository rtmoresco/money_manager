let configPag = { "req_per_page": document.getElementById("item_per_page").value, "page_no": 1 };
const pagination_visible_pages = 3;  //indice de pagina visivel
let windowsPagination = 0

let elementTransaction = getDateTransaction()

function getDateTransaction(){
    let liElement = document.querySelectorAll("li.card")

   return liElement
}


window.onload = function() {
    renderItemPerPage(1)    

    document.querySelector("#next_link").addEventListener("click", actionNextPage)
    document.querySelector("#prev_link").addEventListener("click", actionPrevPage)
}

document.querySelector("#item_per_page").addEventListener("change", comboboxItemPerPage)

function comboboxItemPerPage(){
    configPag = { "req_per_page": document.getElementById("item_per_page").value, "page_no": 1 }
    renderItemPerPage(1)
    createPagination(configPag, elementTransaction)
    document.querySelector("#next_link").addEventListener("click", actionNextPage)
    document.querySelector("#prev_link").addEventListener("click", actionPrevPage)
}

createPagination(configPag, elementTransaction)

//Cria Paginas
function createPagination(configPag, elementTransaction){
    
    if(configPag.item_per_page !== 'ALL') {
       
        let pager = generateElement("firtsPage")// Pag 1

        const total_page = totalPages()

        if (total_page < pagination_visible_pages) {            
            for (let num = 2; num <= total_page; num++) {
                pager += generateElement("middlePage", num);
            }
        } else {            
            for (let num = 2; num <= pagination_visible_pages; num++) {
                pager += generateElement("middlePage", num);
            }
            
            for (let num = pagination_visible_pages + 1; num <= total_page; num++) {
                pager += generateElement("hidePage", num);
            }
        }

        pager += generateElement("lastPage");
        document.querySelector(".pagination").innerHTML = pager

        insertEventClick()
    }

}

function totalPages(){
    return  Math.ceil(parseInt(elementTransaction.length) / parseInt(configPag.req_per_page));
}
    
function generateElement(condition, num = 0){
    if(condition == "firtsPage"){
        return `<a id="prev_link">&laquo;</a>` +
        `<a class="numPage active">1</a>`;
    }else if(condition == "middlePage"){
        return `<a class="numPage">${num}</a>`;
    }else if(condition == "hidePage"){
        return `<a class="hidePage numPage">${num}</a>`;
    }else { //condition == "lastPage"
        return `<a id="next_link">&raquo;</a>`
    }
}

function insertEventClick(){
    for (const value of document.querySelectorAll(".numPage")) {    
          value.addEventListener("click", getNumPage)        
    }
}

function getNumPage(event){
    //e.preventDefault()
    renderItemPerPage(event.target.innerText)
    
    updatePaginationActive(event)
}


// Render the table's row in table request-table
function renderItemPerPage(numPag) {

    let listElement = document.getElementsByClassName("month-year")
    let listElementGroup = document.getElementsByClassName("group-month-year")
    let listCards = document.getElementsByClassName("cards")


    let itemReferencePagInit = configPag.req_per_page * (numPag - 1)
    let itemReferencePagFinal = configPag.req_per_page * (numPag)

    for(let i = 0; i < elementTransaction.length; i ++ ){
        if(elementTransaction[i].style.display == "none")
            elementTransaction[i].style.display = ""


        if(i < itemReferencePagInit - 1 || i >= itemReferencePagFinal){
            elementTransaction[i].style.display = "none"
            //elementTransaction[i].parentElement.style.display = "none"
            //renderGroupMonthYear(elementTransaction[i].parentNode.previousElementSibling)
        }        
    }   
    
   for(let x = 0; x < listElementGroup.length; x ++){
        let element = listElementGroup[x].nextElementSibling.firstElementChild

        listElementGroup[x].style.display = ""
        listCards[x].style.display = ""
      
     
        if(element.style.display == "none"){
            listElementGroup[x].style.display = "none"
            listCards[x].style.display = "none"
        }
    }

  
}

function updatePaginationActive(event){
    

    let numPages = document.querySelectorAll(".numPage")

    for (let i = 0; i < numPages.length; i++) { 
        if(numPages[i].className == "numPage active") 
            numPages[i].className = "numPage"

        if(event.target.innerText == i + 1)
            numPages[i].className = "numPage active"
           
    }
}

function renderGroupMonthYear(elementGroupMonthYear){
    console.log(elementGroupMonthYear.nextElementSibling)
    //elementGroupMonthYear.style.display = "none"
}


//Botao para pagina anterior


function actionPrevPage(){

    let numPages = document.querySelectorAll(".numPage")

    let positionPagActived

    for(let y = 0; y < numPages.length; y++){
        if(numPages[y].className == "numPage active"){
            positionPagActived = y
        }
    }
             
    if(numPages[positionPagActived].className == "numPage active" & numPages[positionPagActived - 1].className != "hidePage numPage"){
        let numPage
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                numPage = numPages[i].innerText
                numPages[i].className = "numPage"
            }
        }

        for(let y = 0; y < numPages.length; y++){
            console.log(numPage)
            if(numPage -1 == y){
                numPages[y - 1].className = "numPage active"
            }
        }  
        
        renderItemPerPage(numPage -1)
    }else{
        
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                positionPagActived = i
            }
        }   

        for(let i = positionPagActived; i > -1 ; i--){
            if(numPages[i].className == "hidePage numPage"){
                numPages[i].className = "numPage active"
                numPages[i + 1].className = "numPage"
                numPages[i + pagination_visible_pages].className = "hidePage numPage"
                break
            }
        }  
            
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                let numPage = numPages[i].innerText
                renderItemPerPage(Number(numPage)) 
            }
        }                
        
    }
}

function active_page(element, req_per_page){
    var current_page = document.getElementsByClassName('active');
    var next_link = document.getElementById('next_link');
    var prev_link = document.getElementById('prev_link');
    var next_tab = current_page[0].nextSibling; 
    var prev_tab = current_page[0].previousSibling;

    current_page[0].className = current_page[0].className.replace("active", "");
    if (element === "next") {
        if (parseInt(next_tab.text).toString() === 'NaN') {
            next_tab.previousSibling.className += " active";
            next_tab.setAttribute("onclick", "return false");
        } else {
            next_tab.className += " active"
            render_table_rows(rows, parseInt(req_per_page), parseInt(next_tab.text));
            if (prev_link.getAttribute("onclick") === "return false") {
                prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
            }
            if (next_tab.style.display === "none") {
                next_tab.style.display = "block";
                hide_from_beginning(prev_link.nextSibling)
            }
        }
    } else if (element === "prev") {
        if (parseInt(prev_tab.text).toString() === 'NaN') {
            prev_tab.nextSibling.className += " active";
            prev_tab.setAttribute("onclick", "return false");
        } else {
            prev_tab.className += " active";
            render_table_rows(rows, parseInt(req_per_page), parseInt(prev_tab.text));
            if (next_link.getAttribute("onclick") === "return false") {
                next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
            }
            if (prev_tab.style.display === "none") {
                prev_tab.style.display = "block";
                hide_from_end(next_link.previousSibling)
            }
        }
    } else {
        element.className += "active";
        console.log(element)
        render_table_rows(rows, parseInt(req_per_page), parseInt(element.text));
        if (prev_link.getAttribute("onclick") === "return false") {
            prev_link.setAttribute("onclick", `active_page('prev',\"${rows}\",${req_per_page})`);
        }
        if (next_link.getAttribute("onclick") === "return false") {
            next_link.setAttribute("onclick", `active_page('next',\"${rows}\",${req_per_page})`);
        }
    }
}


//Botao para próxima pagina


function actionNextPage(){

    let numPages = document.querySelectorAll(".numPage")
   
    let positionPagActived

    for(let y = 0; y < numPages.length; y++){
        if(numPages[y].className == "numPage active"){
            positionPagActived = y
        }
    } 
             
    if(numPages[positionPagActived].className == "numPage active" & numPages[positionPagActived + 1].className != "hidePage numPage"){
        let numPage
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                numPage = numPages[i].innerText
                numPages[i].className = "numPage"
            }
        }

        for(let y = 0; y < numPages.length; y++){
            if(numPage == y){
                numPages[y].className = "numPage active"
            }
        }  
     
        renderItemPerPage(Number(numPage) + 1)
    }else {
        
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                positionPagActived = i
            }
        }   

        for(let i = positionPagActived; i < numPages.length; i++){
            if(numPages[i].className == "hidePage numPage"){
                numPages[i].className = "numPage active"
                numPages[i - 1].className = "numPage"

                numPages[i - pagination_visible_pages].className = "hidePage numPage"
                break
            }
        }  
            
        for(let i = 0; i < numPages.length; i++){
            if(numPages[i].className == "numPage active"){
                let numPage = numPages[i].innerText
                renderItemPerPage(Number(numPage)) 
            }
        }                
        
    }
}