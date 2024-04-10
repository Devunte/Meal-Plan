document.addEventListener('DOMContentLoaded', function (){
    var beginSearchButton= document.getElementById('begin-search');
    var formContainer= document.querySelector('.form-container');

    formContainer.style.display= 'none';

    beginSearchButton.addEventListener('click', function (event){
        event.preventDefault();
        formContainer.style.display = 'block';
    })
})