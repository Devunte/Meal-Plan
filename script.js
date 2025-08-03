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
      console.error("Fetch error:", error);
      document.getElementById("recipe-section").innerHTML = "<p>Failed to fetch recipes. Please try again.</p>";
    });
}

const searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("meal-input").value;

  if (!searchInput) {
    console.error("Please enter a recipe name");
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
  recipeCard.appendChild(recipeBody);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  recipeBody.appendChild(titleContainer);

  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.strMeal;
  titleContainer.appendChild(titleEl);

  const favButton = document.createElement("button");
  favButton.classList.add("btn", "btn-outline-primary", "btn-favorite");
  favButton.innerHTML = "+";
  favButton.addEventListener("click", () => {
    addToFavorites(recipe);
    displayFavorites();
  });
  titleContainer.appendChild(favButton);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  recipeBody.appendChild(contentContainer);

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients");
  ingredientsContainer.style.flex = "1";
  contentContainer.appendChild(ingredientsContainer);

  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsContainer.appendChild(ingredientsTitle);

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const ingredientEl = document.createElement("p");
      ingredientEl.textContent = `${measure || ""} ${ingredient}`;
      ingredientsContainer.appendChild(ingredientEl);
    }
  }

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  contentContainer.appendChild(imageContainer);

  const imageEl = document.createElement("img");
  imageEl.src = recipe.strMealThumb;
  imageEl.classList.add("recipe-image");
  imageEl.style.maxWidth = "100%";
  imageEl.addEventListener("click", () => {
    if (recipe.strSource) {
      window.open(recipe.strSource, "_blank");
    }
  });
  imageContainer.appendChild(imageEl);

  const imgMessageEl = document.createElement("p");
  imgMessageEl.textContent = "Click the image for the full recipe!";
  imageContainer.appendChild(imgMessageEl);

  const instructionsEl = document.createElement("p");
  instructionsEl.textContent = recipe.strInstructions;
  recipeBody.appendChild(instructionsEl);

  recipeSection.appendChild(recipeCard);
}

function addToFavorites(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some(fav => fav.idMeal === recipe.idMeal)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});

function displayFavorites() {
  const favoritesContainer = document.getElementById("favorites-container");
  if (!favoritesContainer) return;
  favoritesContainer.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((recipe) => {
    displayFavoriteRecipe(recipe, favoritesContainer);
  });
}

function displayFavoriteRecipe(recipe, container) {
  const titleLink = document.createElement("a");
  titleLink.textContent = recipe.strMeal;
  titleLink.href = recipe.strSource || "#";
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
