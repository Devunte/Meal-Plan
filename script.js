function renderDrinks() {
  const drinkSection = document.getElementById("drink-section");
  drinkSection.innerHTML = ""; // Clear old drinks

  drinksData.forEach(drink => {
    const drinkCard = document.createElement("div");
    drinkCard.classList.add("drink-card");
    drinkCard.style.border = "1px solid #aaa";
    drinkCard.style.margin = "10px";
    drinkCard.style.padding = "10px";
    drinkCard.style.maxWidth = "150px";

    const drinkName = document.createElement("h4");
    drinkName.textContent = drink.name;

    const drinkDesc = document.createElement("p");
    drinkDesc.textContent = drink.description;

    const drinkImg = document.createElement("img");
    drinkImg.src = drink.image;
    drinkImg.alt = drink.name;
    drinkImg.style.width = "100%";

    drinkCard.appendChild(drinkImg);
    drinkCard.appendChild(drinkName);
    drinkCard.appendChild(drinkDesc);

    drinkSection.appendChild(drinkCard);
  });
}

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

      // IMPORTANT: Render drinks every time to ensure they stay visible
      renderDrinks();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("recipe-section").innerHTML = "<p>Failed to fetch recipes. Please try again.</p>";
    });
}

const searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("meal-input").value;
  if (!searchInput) {
    alert("Please enter a recipe name");
    return;
  }
  getRecipeData();
});

function displayRecipes(recipe) {
  const recipeSection = document.getElementById("recipe-section");
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("card");
  recipeCard.style.border = "1px solid #333";
  recipeCard.style.margin = "10px";
  recipeCard.style.padding = "10px";

  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.strMeal;

  const imageEl = document.createElement("img");
  imageEl.src = recipe.strMealThumb;
  imageEl.style.width = "100%";
  imageEl.style.maxWidth = "300px";

  const ingredientsEl = document.createElement("div");
  ingredientsEl.innerHTML = "<h4>Ingredients:</h4>";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const p = document.createElement("p");
      p.textContent = `${measure || ""} ${ingredient}`;
      ingredientsEl.appendChild(p);
    }
  }

  const instructionsEl = document.createElement("p");
  instructionsEl.textContent = recipe.strInstructions;

  recipeCard.appendChild(titleEl);
  recipeCard.appendChild(imageEl);
  recipeCard.appendChild(ingredientsEl);
  recipeCard.appendChild(instructionsEl);

  recipeSection.appendChild(recipeCard);
}
