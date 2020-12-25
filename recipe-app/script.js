const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopupEl = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const closePopupBtn = document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  //console.log(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();

  const meals = respData.meals;
  //console.log(meals);
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ""}
            <img 
                src="${mealData.strMealThumb}" alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4> ${mealData.strMeal}</h4>
            <button class="fav-btn" >
                <i class="fas fa-heart"></i>
            </button>
        </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToStorage(mealData.idMeal);
      btn.classList.toggle("active");
    }

    fetchFavMeals();
  });
  // show info on click
  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsEl.appendChild(meal);
}

function addMealToStorage(mealId) {
  const mealIds = getMealsFromStorage();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromStorage(mealId) {
  const mealIds = getMealsFromStorage();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromStorage() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  //console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsFromStorage();

  for (i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addMealToFav(meal);
  }

  //console.log(meals);

  // add them the screen
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
        <button class="remove-fav"><i class="fas fa-window-close"></i></button>
            <img
                src="${mealData.strMealThumb}" alt="${mealData.strMeal}"
            />
            <span>${mealData.strMeal}</span>
        
        `;

  const btn = favMeal.querySelector(".remove-fav");
  btn.addEventListener("click", () => {
    removeMealFromStorage(mealData.idMeal);
    fetchFavMeals();
  });
  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  favoriteContainer.appendChild(favMeal);
}

searchBtn.addEventListener("click", async () => {
  // clean container for new search
  mealsEl.innerHTML = "";
  const search = searchTerm.value;
  const results = await getMealsBySearch(search);
  console.log(results);

  if (results) {
    results.forEach((meal) => {
      addMeal(meal);
    });
  }
});

closePopupBtn.addEventListener("click", () => {
  mealPopupEl.classList.add("hidden");
});

function showMealInfo(mealData) {
  // cleanup the infomeal
  mealInfoEl.innerHTML = "";
  //update meal info
  const mealEl = document.createElement("div");

  //get ingredients and measures
  const ingredients = [];
  for (i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    `;

  mealInfoEl.appendChild(mealEl);
  // show the popup
  mealPopupEl.classList.remove("hidden");
}
