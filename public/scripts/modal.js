
document.querySelector('.link-category').addEventListener('click', function() { 
    document.querySelector('#modal-category').classList.add('modal-open');
    document.querySelector('#modal-category').classList.remove('modal-close');  
  
})


document.querySelector('.btn-close').addEventListener('click', function() {
    document.querySelector('#modal-category').classList.add('modal-close');
	document.querySelector('#modal-category').classList.remove('modal-open');
})









