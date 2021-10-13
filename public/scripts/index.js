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

