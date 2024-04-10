let search=''
function getRecipeData(){
    const apiKey= `5ca76f850838b3aa7817d13c9750a1a5`
    const apiId= `6245cd9b`
    const url=  `https://api.edamam.com/search?q=${search}&app_id=${apiId}&app_key=${apiKey}`
    
    fetch(url)
    .then(response => {
    if (!response.ok) {
        throw new Error('Bad network response');
    }
    return response.json();
})
.then(data => {
    localStorage.setItem('recipes', JSON.stringify(data))
    console.log(data); 
})
.catch(error => {
    console.error('Bad fetch:', error);
});
}



// TODO: Create an event that hides the bottom sectioon below the button -Done
document.addEventListener('DOMContentLoaded', function (){
    var beginSearchButton= document.getElementById('begin-search');
    var formContainer= document.querySelector('.form-container');

    formContainer.style.display= 'none';

    beginSearchButton.addEventListener('click', function (event){
        event.preventDefault();
        formContainer.style.display = 'block';
    })
})

//Todo: Create a function and event that allows you to fill in the form and pull recipes from the api to the local storage once the submit button is pushed. 
const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event){
    event.preventDefault();
    search= document.getElementById('meal-input').value;
    
    if (!search){
        console.error('Input search value')
        return
    }
    getRecipeData();

}
searchFormEl.addEventListener('submit',handleSearchFormSubmit);

//Todo: Move the recipe cards from local storage to the query window

