


const insertEventDelete = () => {
    for(const value of document.querySelectorAll(".delete")) {
        value.addEventListener('click', function() {
            const modal = document.querySelector('#modal-delete')
            
            if(modal) {

                const modalInputId = document.getElementById('modalId')
                modalInputId.value = value.children[0].value

                modal.classList.add('modal-open');
                modal.classList.remove('modal-close'); 

                

                modal.addEventListener('click', (e) => {
                    if(e.target.className == 'btn-close') {
                        modal.classList.add('modal-close');
                        modal.classList.remove('modal-open');
                    }
                });
            }

        })
    }
}


/*document.querySelector('.btn-delete-close').addEventListener('click', function() {
    document.querySelector('#modal-delete').classList.add('modal-close');
	document.querySelector('#modal-delete').classList.remove('modal-open');
})*/

const btn = document.querySelector(".button");

btn.addEventListener("click", () => {
    btn.classList.add("button-loading");
});



insertEventDelete()

