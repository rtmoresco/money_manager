//validacao dos campos de cadastro

let fieldName = document.getElementById("mail")

fieldName.onblur = async function(){
    const name = fieldName.value


    const alert = document.getElementById("alert-email")
    
    
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


const formatValueField = () =>{
    
    let valueField = document.getElementById('mail') // Seletor do campo email
    const alert = document.getElementById("alert-email")

    //valueField.addEventListener('keypress', (event) => maskOfValue (event.target.value)) // Dispara quando digitado no campo
    valueField.addEventListener('change', (event) => maskOfValue (event.target.value)) // Dispara quando autocompletado o campo
    

    const maskOfValue = (value) => {
        
    
        const regex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //validação preenchimento de email
        
        const valueFormat = value.match(regex)
        if(!valueFormat){            
            alert.innerHTML = "Email inválido!"
        }else{
            alert.innerHTML = "" 
        }     
    }
}

formatValueField()