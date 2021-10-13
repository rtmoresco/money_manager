const comboBoxType = () =>{
    document.querySelector('.group-combobox').addEventListener('click', function() {
        this.querySelector('.custom-selection').classList.toggle('open');
        closeAnotherCombox(this);
    })
    
    
    for (const value of document.querySelectorAll(".value")) {
        
        value.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.value.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-selection').querySelector('.header-select span').textContent = this.textContent;
                document.getElementById("type").value = this.textContent
            }else{
                this.closest('.custom-selection').querySelector('.header-select span').textContent = this.textContent;
                document.getElementById("type").value = this.textContent
            }
        })
    }
}


const comboBoxCategory = () =>{

    document.querySelector('.group-combobox-category').addEventListener('click', function() {
        this.querySelector('.custom-selection-category').classList.toggle('open');
        closeAnotherCombox(this);
    })
    
    
    for (const value of document.querySelectorAll(".value-category")) {
        
        value.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.value-category.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-selection-category').querySelector('.header-select-category span').textContent = this.textContent;
                document.getElementById("category").value = this.textContent
                console.log(this.textContent)
            }else{
                this.closest('.custom-selection-category').querySelector('.header-select-category span').textContent = this.textContent;
                document.getElementById("category").value = this.textContent
            }
        })
    }
}


function closeAnotherCombox(classList){

    switch (classList.className) {
        case "group-combobox":
            document.querySelector('.custom-selection-category').classList.remove('open')
            break;
        case "group-combobox-category":
            document.querySelector('.custom-selection').classList.remove('open')
        break;
    }
    
}


const formatValueField = () =>{
    
    let valueField = document.getElementById('value-transaction') // Seletor do campo de telefone

    valueField.addEventListener('keypress', (event) => maskOfValue (event.target.value)) // Dispara quando digitado no campo
    valueField.addEventListener('change', (event) => maskOfValue (event.target.value)) // Dispara quando autocompletado o campo


    const maskOfValue = (value) => {
        //const regex = /[0-9]+(\.[0-9][0-9]?)?/g
        //valor = valor.replace(",",".")
    
        const regex  = /^[0-9]+([.][0-9]{0,2})?/g
        
        const valueFormat = value.match(regex)
        valueField.value = valueFormat[0]
    }
}



comboBoxType();
comboBoxCategory();
formatValueField();