function getFoodData(event) {
  event.preventDefault();
  const searchInput = document.getElementById("meal-input").value;
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchInput}&search_simple=1&action=process&json=1`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(data => {
      const recipeSection = document.getElementById("recipe-section");
      recipeSection.innerHTML = "";

      if (data.products && data.products.length > 0) {
        data.products.forEach(product => {
          displayProduct(product);
        });
      } else {
        recipeSection.innerHTML = "<p>No products found. Try a different search term.</p>";
      }
    })
    .catch(error => {
      console.error("Fetch failed:", error);
      document.getElementById("recipe-section").innerHTML = "<p>Could not load products.</p>";
    });
}

function displayProduct(product) {
  const recipeSection = document.getElementById("recipe-section");

  const productCard = document.createElement("div");
  productCard.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = product.product_name || "Unnamed Product";
  productCard.appendChild(title);

  if (product.image_front_url) {
    const img = document.createElement("img");
    img.src = product.image_front_url;
    img.alt = product.product_name;
    img.style.width = "100%";
    productCard.appendChild(img);
  }

  const ingredients = document.createElement("p");
  ingredients.textContent = `Ingredients: ${product.ingredients_text || "Not available"}`;
  productCard.appendChild(ingredients);

  const nutrition = document.createElement("p");
  nutrition.textContent = `Nutrition Score: ${product.nutrition_grades || "N/A"}`;
  productCard.appendChild(nutrition);

  recipeSection.appendChild(productCard);
}

// Attach to form
document.getElementById("search-form").addEventListener("submit", getFoodData);
