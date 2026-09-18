// DOM Selection

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const recipeGrid = document.getElementById("recipeGrid");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorText = document.getElementById("errorText");
const noResults = document.getElementById("noResults");

const resultCount = document.getElementById("resultCount");

// API URL

const API_URL =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Search Form

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
        searchInput.focus();
        return;
    }

    searchRecipes(searchTerm);
});

// Fetch Recipes

async function searchRecipes(searchTerm) {

    showLoading();

    try {

        const response = await fetch(
            `${API_URL}${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error("Unable to connect to the recipe API.");
        }

        const data = await response.json();

        console.log("API Response:", data);

        if (!data.meals) {
            showNoResults();
            return;
        }

        displayRecipes(data.meals);

    } catch (error) {

        console.error("Recipe error:", error);

        showError(error.message);

    }
}

// Display Recipes

function displayRecipes(meals) {

    hideAllStates();

    recipeGrid.innerHTML = "";

    resultCount.textContent =
        `${meals.length} recipe${meals.length === 1 ? "" : "s"} found`;

    meals.forEach(function (meal) {

        const card = createRecipeCard(meal);

        recipeGrid.appendChild(card);

    });
}

// Create Recipe Card

function createRecipeCard(meal) {

    const card = document.createElement("article");

    card.classList.add("recipe-card");

    card.innerHTML = `
        <div class="recipe-image">

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            >

            <span class="recipe-category">
                ${meal.strCategory || "Recipe"}
            </span>

        </div>

        <div class="recipe-content">

            <h3>${meal.strMeal}</h3>

            <div class="recipe-meta">

                <span>
                    <i class="fa-solid fa-earth-americas"></i>
                    ${meal.strArea || "International"}
                </span>

                <span>
                    <i class="fa-solid fa-utensils"></i>
                    ${meal.strCategory || "Meal"}
                </span>

            </div>

            <button
                class="recipe-button"
                data-meal-id="${meal.idMeal}"
            >
                View Recipe
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        </div>
    `;

    const button = card.querySelector(".recipe-button");

    button.addEventListener("click", function () {

        showRecipeDetails(meal);

    });

    return card;
}

// Show Recipe Details

function showRecipeDetails(meal) {

    const ingredients = getIngredients(meal);

    const details = document.createElement("div");

    details.classList.add("recipe-details");

    details.innerHTML = `
        <div class="details-content">

            <button class="close-details">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            >

            <div class="details-text">

                <span class="section-label">
                    ${meal.strCategory || "Recipe"}
                </span>

                <h2>${meal.strMeal}</h2>

                <p class="details-area">
                    <i class="fa-solid fa-earth-americas"></i>
                    ${meal.strArea || "International"}
                </p>

                <h3>Ingredients</h3>

                <ul>
                    ${ingredients
                        .map(function (ingredient) {
                            return `<li>${ingredient}</li>`;
                        })
                        .join("")}
                </ul>

                <h3>Instructions</h3>

                <p>
                    ${meal.strInstructions}
                </p>

            </div>

        </div>
    `;

    document.body.appendChild(details);

    const closeButton =
        details.querySelector(".close-details");

    closeButton.addEventListener("click", function () {
        details.remove();
    });

    details.addEventListener("click", function (event) {

        if (event.target === details) {
            details.remove();
        }

    });

}

// Get Ingredients

function getIngredients(meal) {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        const ingredient =
            meal[`strIngredient${i}`];

        const measure =
            meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients.push(
                `${measure || ""} ${ingredient}`.trim()
            );

        }

    }

    return ingredients;
}

// Loading State

function showLoading() {

    hideAllStates();

    loading.style.display = "block";

    resultCount.textContent = "";
}

// Error State

function showError(message) {

    hideAllStates();

    error.style.display = "block";

    errorText.textContent = message;

    resultCount.textContent = "";
}

// No Results State

function showNoResults() {

    hideAllStates();

    noResults.style.display = "block";

    resultCount.textContent = "";
}

// Hide States

function hideAllStates() {

    loading.style.display = "none";
    error.style.display = "none";
    noResults.style.display = "none";

    recipeGrid.innerHTML = "";
}