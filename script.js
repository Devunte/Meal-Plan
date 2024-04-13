let searchInput = document.getElementById("meal-input").value;
console.log(searchInput);

function getRecipeData() {
  const apiKey = `5ca76f850838b3aa7817d13c9750a1a5`;
  const apiId = `6245cd9b`;
  const url = `https://api.edamam.com/search?q=${searchInput}&app_id=${apiId}&app_key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("recipes", JSON.stringify(data));

      console.log(data.hits);
      const recipeSection = document.getElementById("recipe-section");

      // Clear previous search results
      recipeSection.innerHTML = "";

      const recipes = data.hits;
      recipes.forEach((recipe) => {
        displayRecipes(recipe.recipe);
      });
    })
    .catch((error) => {
      console.error("Bad fetch:", error);
    });
}

//Todo: Create a function and event that allows you to fill in the form and pull recipes from the api to the local storage once the submit button is pushed.
const searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();
  searchInput = document.getElementById("meal-input").value;

  if (!searchInput) {
    console.error("Input search value");
    return;
  }
  getRecipeData();
}
searchFormEl.addEventListener("submit", handleSearchFormSubmit);

// Todo: Move the recipe cards from local storage to the query window
function displayRecipes(recipe) {
  console.log(recipe);
  const recipeSection = document.getElementById("recipe-section");

  const recipeCard = document.createElement("div");
  recipeCard.classList.add("card");
  const recipeBody = document.createElement("div");
  recipeBody.classList.add("card-body");
  recipeCard.append(recipeBody);
  // Title and favorites container
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  recipeBody.append(titleContainer);

  //Title
  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.label;
  titleContainer.append(titleEl);

  // Favorites
  const favButton = document.createElement("button");
  favButton.classList.add("btn", "btn-outline-primary", "btn-favorite");
  favButton.innerHTML = "+";
  favButton.addEventListener("click", () => {
    addToFavorites(recipe);
    console.log("Add to favorites clicked");
    displayFavorites();
  });
  titleContainer.append(favButton);
  // Container for ingredients and image
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  recipeBody.append(contentContainer);

  // Ingredients
  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients");
  ingredientsContainer.style.flex = "1";
  contentContainer.append(ingredientsContainer);
  recipe.ingredients.forEach((ingredient) => {
    const ingredientEl = document.createElement("p");
    ingredientEl.textContent = ingredient.text;
    ingredientsContainer.append(ingredientEl);
  });

  // Image
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  contentContainer.append(imageContainer);

  const imageUrl = document.createElement("a");
  imageUrl.href = recipe.url;
  imageUrl.target = "_blank";
  imageContainer.append(imageUrl);

  const imageEl = document.createElement("img");
  imageEl.src = recipe.image;
  imageEl.classList.add("recipe-image");
  imageEl.style.maxWidth = "100%";
  imageEl.addEventListener("click", () => {
    window.open(recipe.url, "_blank");
  });
  imageUrl.append(imageEl);
  const imgMessageEl = document.createElement("p");
  imgMessageEl.textContent = "Click the image for the full recipe!";
  imageContainer.append(imgMessageEl);

  //Title
  titleEl.textContent = recipe.label;
  recipeBody.prepend(titleEl);

  //Body
  const bodyContentEl = document.createElement("p");
  recipeBody.append(bodyContentEl);
  recipeSection.append(recipeCard);
}
let drinkform = document.getElementById("drink-form");

// Favorites section
function addToFavorites(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(recipe);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});
// Display the recipes in the favorites section
function displayFavorites() {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = "";
  console.log("made favorite");

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((recipe) => {
    displayFavoriteRecipe(recipe, favoritesContainer);
  });
}
function displayFavoriteRecipe(recipe, container) {
  const titleLink = document.createElement("a");
  titleLink.textContent = recipe.label;
  titleLink.href = recipe.url;
  titleLink.target = "_blank";
  console.log("made stuff");

  const recipeCard = document.createElement("div");
  recipeCard.classList.add("favorite-card");
  recipeCard.style.display = "block";
  recipeCard.style.border = "1px solid grey";
  recipeCard.style.padding = "10px";
  recipeCard.style.marginBottom = "10px";

  recipeCard.appendChild(titleLink);
  container.appendChild(recipeCard);
}

// console.log(search);
function getdrinkData(event) {
  event.preventDefault();
  let search = document.getElementById("drink-input").value;
  const apiKey = `1`;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("name", JSON.stringify(data));

      console.log(data.drinks);
      const drinkSection = document.getElementById("drink-section");

      // Clear previous search results
      drinkSection.innerHTML = "";

      const drinks = data.drinks;
      drinks.forEach((drink) => {
        displayDrink(drink);
      });
    });
}
function displayDrink(drink) {
  const drinkSection = document.getElementById("drink-section");

  // Create a div element to hold the drink details
  const drinkDetails = document.createElement("div");

  // Display the drink title
  const drinkTitle = document.createElement("h3");
  drinkTitle.textContent = drink.strDrink;
  drinkDetails.appendChild(drinkTitle);

  // Display the drink instructions
  const drinkInstructions = document.createElement("p");
  drinkInstructions.textContent = drink.strInstructions;
  drinkDetails.appendChild(drinkInstructions);

  // Display the drink image
  const drinkImage = document.createElement("img");
  drinkImage.style.width = "150px";
  drinkImage.src = drink.strDrinkThumb;
  drinkImage.alt = drink.strDrink;
  drinkDetails.appendChild(drinkImage);

  drinkSection.appendChild(drinkDetails);
}

drinkform.addEventListener("submit", getdrinkData);
