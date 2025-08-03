// Function to handle fetching both meals and drinks
function searchForMealsAndDrinks(searchTerm) {
  const mealApiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
  const drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;

  // Fetch meals
  fetch(mealApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response for meals was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayRecipes(data.meals);
    })
    .catch((error) => {
      console.error("Fetch error for meals:", error);
      document.getElementById("recipe-section").innerHTML =
        "<p>No recipes found. Please try a different search.</p>";
    });

  // Fetch drinks
  fetch(drinkApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response for drinks was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayDrinks(data.drinks);
    })
    .catch((error) => {
      console.error("Fetch error for drinks:", error);
      document.getElementById("drink-section").innerHTML =
        "<p>No drinks found. Please try a different search.</p>";
    });
}

// Function to display meal recipes
function displayRecipes(meals) {
  const recipeSection = document.getElementById("recipe-section");
  recipeSection.innerHTML = "";

  if (!meals) {
    recipeSection.innerHTML = "<p>No recipes found for your search.</p>";
    return;
  }

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "recipe-card box";
    mealCard.innerHTML = `
      <div class="card-content">
        <h3 class="title is-4">${meal.strMeal}</h3>
        <figure class="image is-4by3">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </figure>
        <p><strong>Category:</strong> ${meal.strCategory || "N/A"}</p>
        <p><strong>Area:</strong> ${meal.strArea || "N/A"}</p>
        <p class="has-text-left mt-2"><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 300)}...</p>
        <a href="${meal.strSource || "#"}" target="_blank" class="button is-link mt-2">View Full Recipe</a>
      </div>
    `;
    recipeSection.appendChild(mealCard);
  });
}

// Function to display drink recipes
function displayDrinks(drinks) {
  const drinkSection = document.getElementById("drink-section");
  drinkSection.innerHTML = "";

  if (!drinks) {
    drinkSection.innerHTML = "<p>No drinks found for your search.</p>";
    return;
  }

  drinks.forEach((drink) => {
    const drinkCard = document.createElement("div");
    drinkCard.className = "drink-card box";
    drinkCard.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
      <div class="card-content">
        <h4>${drink.strDrink}</h4>
        <p><strong>Category:</strong> ${drink.strCategory || "N/A"}</p>
        <p class="has-text-left mt-2"><strong>Instructions:</strong> ${drink.strInstructions.slice(0, 100)}...</p>
      </div>
    `;
    drinkSection.appendChild(drinkCard);
  });
}

// Event listener for the search form
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const query = document.getElementById("meal-input").value.trim();
  if (query) {
    searchForMealsAndDrinks(query);
  } else {
    alert("Please enter a recipe name or keyword.");
  }
});
