document.addEventListener("DOMContentLoaded", () => {
  const searchFormEl = document.querySelector("#search-form");
  searchFormEl.addEventListener("submit", handleSearchFormSubmit);

  const drinkform = document.getElementById("drink-form");
  drinkform.addEventListener("submit", getdrinkData);
});

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("meal-input").value.trim();

  if (!searchInput) {
    console.error("Please enter a meal name.");
    return;
  }

  getRecipeData(searchInput);
}

function getdrinkData(event) {
  event.preventDefault();
  const search = document.getElementById("drink-input").value.trim();
  if (!search) {
    console.error("Please enter a drink name.");
    return;
  }

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Bad network response");
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("drinks", JSON.stringify(data));
      const drinkSection = document.getElementById("drink-section");
      drinkSection.innerHTML = "";

      const drinks = data.drinks;
      if (drinks) {
        drinks.forEach((drink) => displayDrink(drink));
      } else {
        drinkSection.innerHTML = "<p>No drinks found.</p>";
      }
    })
    .catch((err) => console.error("Fetch error:", err));
}

function getRecipeData(searchInput) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Bad network response");
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("meals", JSON.stringify(data));
      const recipeSection = document.getElementById("recipe-section");
      recipeSection.innerHTML = "";

      const meals = data.meals;
      if (meals) {
        meals.forEach((meal) => displayRecipes(meal));
      } else {
        recipeSection.innerHTML = "<p>No meals found.</p>";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function displayRecipes(meal) {
  const recipeSection = document.getElementById("recipe-section");

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = meal.strMeal;

  const img = document.createElement("img");
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.style.width = "100%";

  const instructions = document.createElement("p");
  instructions.textContent = meal.strInstructions;

  const ingredientsList = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const li = document.createElement("li");
      li.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(ingredientsList);
  card.appendChild(instructions);

  recipeSection.appendChild(card);
}

function displayDrink(drink) {
  const drinkSection = document.getElementById("drink-section");

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = drink.strDrink;

  const img = document.createElement("img");
  img.src = drink.strDrinkThumb;
  img.alt = drink.strDrink;
  img.style.width = "150px";

  const instructions = document.createElement("p");
  instructions.textContent = drink.strInstructions;

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(instructions);

  drinkSection.appendChild(card);
}
