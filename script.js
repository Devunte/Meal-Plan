let searchInput = document.getElementById("meal-input").value;

function getRecipeData() {
  const apiKey = `1`; // TheMealDB's free test API key
  const searchInput = document.getElementById("meal-input").value;
  const url = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchInput}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("recipes", JSON.stringify(data));
      const recipeSection = document.getElementById("recipe-section");
      recipeSection.innerHTML = "";

      if (data.meals) {
        const recipes = data.meals;
        recipes.forEach((recipe) => {
          displayRecipes(recipe);
        });
      } else {
        recipeSection.innerHTML = "<p>No recipes found. Please try a different search.</p>";
      }
    })
    .catch((error) => {
      console.error("Bad fetch:", error);
      document.getElementById("recipe-section").innerHTML = "<p>Failed to fetch recipes. Please try again.</p>";
    });
}

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

function displayRecipes(recipe) {
  const recipeSection = document.getElementById("recipe-section");
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("card");
  const recipeBody = document.createElement("div");
  recipeBody.classList.add("card-body");
  recipeCard.append(recipeBody);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  recipeBody.append(titleContainer);

  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.strMeal;
  titleContainer.append(titleEl);

  const favButton = document.createElement("button");
  favButton.classList.add("btn", "btn-outline-primary", "btn-favorite");
  favButton.innerHTML = "+";
  favButton.addEventListener("click", () => {
    addToFavorites(recipe);
    displayFavorites();
  });
  titleContainer.append(favButton);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  recipeBody.append(contentContainer);

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients");
  ingredientsContainer.style.flex = "1";
  contentContainer.append(ingredientsContainer);

  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsContainer.append(ingredientsTitle);

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      const ingredientEl = document.createElement("p");
      ingredientEl.textContent = `${measure || ""} ${ingredient}`;
      ingredientsContainer.append(ingredientEl);
    }
  }

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  contentContainer.append(imageContainer);

  const imageUrl = document.createElement("a");
  imageUrl.href = recipe.strSource || '#';
  imageUrl.target = "_blank";
  imageContainer.append(imageUrl);

  const imageEl = document.createElement("img");
  imageEl.src = recipe.strMealThumb;
  imageEl.classList.add("recipe-image");
  imageEl.style.maxWidth = "100%";
  imageEl.addEventListener("click", () => {
    if (recipe.strSource) {
      window.open(recipe.strSource, "_blank");
    }
  });
  imageUrl.append(imageEl);
  const imgMessageEl = document.createElement("p");
  imgMessageEl.textContent = "Click the image for the full recipe!";
  imageContainer.append(imgMessageEl);

  const instructionsEl = document.createElement("p");
  instructionsEl.textContent = recipe.strInstructions;
  recipeBody.append(instructionsEl);

  recipeSection.append(recipeCard);
}

let drinkform = document.getElementById("drink-form");

function addToFavorites(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some(fav => fav.strMeal === recipe.strMeal)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});

function displayFavorites() {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((recipe) => {
    displayFavoriteRecipe(recipe, favoritesContainer);
  });
}

function displayFavoriteRecipe(recipe, container) {
  const titleLink = document.createElement("a");
  // Check for the correct key (strMeal for meals, strDrink for drinks)
  titleLink.textContent = recipe.strMeal || recipe.strDrink;
  titleLink.href = recipe.strSource || '#';
  titleLink.target = "_blank";

  const recipeCard = document.createElement("div");
  recipeCard.classList.add("favorite-card");
  recipeCard.style.display = "block";
  recipeCard.style.border = "1px solid grey";
  recipeCard.style.padding = "10px";
  recipeCard.style.marginBottom = "10px";

  recipeCard.appendChild(titleLink);
  container.appendChild(recipeCard);
}

function getdrinkData(event) {
  event.preventDefault();
  let search = document.getElementById("drink-input").value;
  const apiKey = `1`;
  const url = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?s=${search}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("name", JSON.stringify(data));
      const drinkSection = document.getElementById("drink-section");
      drinkSection.innerHTML = "";
      if (data.drinks) {
        const drinks = data.drinks;
        drinks.forEach((drink) => {
          displayDrink(drink);
        });
      } else {
        drinkSection.innerHTML = "<p>No drinks found. Try a different search term.</p>";
      }
    })
    .catch((error) => {
      console.error("Bad fetch:", error);
      document.getElementById("drink-section").innerHTML = "<p>Failed to fetch drinks. Please try again.</p>";
    });
}
function displayDrink(drink) {
  const drinkSection = document.getElementById("drink-section");
  const drinkCard = document.createElement("div");
  drinkCard.classList.add("card");
  const drinkBody = document.createElement("div");
  drinkBody.classList.add("card-body");
  drinkCard.append(drinkBody);

  const drinkTitle = document.createElement("h3");
  drinkTitle.textContent = drink.strDrink;
  drinkBody.appendChild(drinkTitle);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  drinkBody.append(imageContainer);
  const drinkImage = document.createElement("img");
  drinkImage.src = drink.strDrinkThumb;
  drinkImage.alt = drink.strDrink;
  drinkImage.style.width = "100%";
  drinkImage.classList.add("recipe-image");
  imageContainer.appendChild(drinkImage);

  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add("instructions");
  drinkBody.append(instructionsContainer);
  const instructionsTitle = document.createElement("h4");
  instructionsTitle.textContent = "Instructions";
  instructionsContainer.appendChild(instructionsTitle);
  const drinkInstructions = document.createElement("p");
  drinkInstructions.textContent = drink.strInstructions;
  instructionsContainer.appendChild(drinkInstructions);

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients");
  drinkBody.append(ingredientsContainer);
  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsContainer.appendChild(ingredientsTitle);

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      const ingredientEl = document.createElement("p");
      ingredientEl.textContent = `${measure || ""} ${ingredient}`;
      ingredientsContainer.appendChild(ingredientEl);
    }
  }

  drinkSection.appendChild(drinkCard);
}

drinkform.addEventListener("submit", getdrinkData);
