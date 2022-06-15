const lateralMenu = document.querySelector(".open-account")
const hambuguer = document.querySelector(".nav-icon")
const authentication = document.querySelector(".authentication")
hambuguer.addEventListener("click", displayMobileMenu)

function displayMobileMenu(){
    lateralMenu.classList.toggle("active")  
    hambuguer.classList.toggle("active")
    authentication.classList.toggle("inactive")
}

const iconMaximizeList = document.querySelectorAll(".show-data")
const cards = document.querySelectorAll(".cards")

iconMaximizeList.forEach((iconMaximize, index) => {
    iconMaximize.addEventListener("click", () =>{
        iconMaximize.classList.toggle("fa-minus-square")        
        iconMaximize.classList.toggle("fa-plus-square")
    })
})



//validacao dos campos de cadastro

let fieldName = document.getElementById("mail")

fieldName.onblur = async function(){
    const name = fieldName.value

    console.log(name)
    const alert = document.getElementById("alert-email")
    alert.innerHTML = ""
    
    if(name != null || name != undefined){
        let listMail  = await fetch("http://localhost:4000/getUsers")
                                .then(res => res.json())
                                .then(json => json)
                                .catch(err => err)

        listMail.forEach((mail, index) => {
            if(name === mail.mail){
                alert.innerHTML = "Email já existe !"
            }
        })
        
    }
}
