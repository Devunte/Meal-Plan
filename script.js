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
  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.label;
  recipeBody.prepend(titleEl);

  //Body
  const bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    // `<strong>Recipe:</strong>${recipe.ingredients[0].text}`
    // recipeBody.append(bodyContentEl)
    recipeSection.append(recipeCard);
}
