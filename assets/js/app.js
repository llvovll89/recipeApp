const searchBtn = document.querySelector("#search-btn");
const foodList = document.querySelector("#food");
const foodContent = document.querySelector(".food-content");
const closeBtn = document.querySelector("#close-btn");
const foodDetail = document.querySelector(".food-details");

// btn event
searchBtn.addEventListener("click", getFood);
foodList.addEventListener("click", getRecipe);
// close btn
closeBtn.addEventListener("click", () => {
  foodDetail.classList.remove("showRecipe");
});

function getFood() {
  let searchInputVal = document.querySelector("#search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputVal}`
  )
    .then((response) => response.json())
    .then((data) => {
      let inHtml = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          inHtml += `
                <div class="food-item" data-id= "${meal.idMeal}">
                <div class="food-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="food-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">레시피 보기</a>
                </div>
            </div>`;
        });
        foodList.classList.remove("notRecipe");
      } else {
        inHtml = `죄송합니다,, 찾을 수 없는 레시피에요🙄`;
        foodList.classList.add("notRecipe");
      }

      foodList.innerHTML = inHtml;
    })
    .catch((err) => console.log(err));
}

function getRecipe(e) {
  e.preventDefault();
  const clickTarget = e.target;
  if (clickTarget.classList.contains("recipe-btn")) {
    let foodItem = clickTarget.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => foodModal(data.meals))
      .catch((err) => console.log(err));
  }
}

function foodModal(food) {
  food = food[0];
  let inHtml = `
    <div class="recipe-title">${food.strMeal}</div>
    <p class="food-category">${food.strCategory}</p>
    <div class="food-instruct">
        <p>${food.strInstructions}</p>
    </div>
    <div class="recipe-img">
        <img src="${food.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
        <a href="${food.strYoutube}" target="_blank">레시피 영상보기</a>
    </div> 
    `;
  foodContent.innerHTML = inHtml;
  foodDetail.classList.add("showRecipe");
}
