function getRecipeData() {
  const searchInput = document.getElementById("meal-input").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("meals", JSON.stringify(data));
      console.log(data.meals);

      const recipeSection = document.getElementById("recipe-section");
      recipeSection.innerHTML = "";

      const recipes = data.meals;
      if (recipes) {
        recipes.forEach((meal) => {
          displayRecipes(meal);
        });
      } else {
        recipeSection.innerHTML = "<p>No recipes found.</p>";
      }
    })
    .catch((error) => {
      console.error("Bad fetch:", error);
    });
}
