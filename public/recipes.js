const list = document.getElementById("recipe-list");

function getImage(category){
  let poster;
  switch(category){
    case "Dessert":
      poster = "https://www.svgrepo.com/show/874/cheese.svg"
      break
    case "First course":
      poster = "https://www.svgrepo.com/show/39679/bowl.svg"
      break
    case "Main course":
      poster = "https://www.svgrepo.com/show/24765/food.svg"
      break
    case "Drinks":
      poster = "https://www.svgrepo.com/show/873/frappe.svg"
      break
    default:
      poster = "https://www.svgrepo.com/show/24765/food.svg"
      break
  }
  return poster
}

axios.get("/api/recipes/data")
  .then(res => {
    list.innerHTML = "";

    res.data.forEach(recipe => {
      list.innerHTML += `
        <div class="recipe__card">
          <img id="food" src=${getImage(recipe.category)} alt="">
          <h5 class="name">${recipe.name}</h5>

          <div id="flex">
            <p>Type: ${recipe.type}</p>
            <p>Cooking time: ${recipe.cookingTime} min</p>   
          </div>
          
          <div id="flex">
            <p>Category: ${recipe.category}</p>
          </div>
          
          <div id="flex">
            <p>Cuisine: ${recipe.cuisine}</p>
          </div>

          <div class="recipe__card-center">
            <div class="recipe__card-dif">${recipe.difficulty}</div>
            <img id="star" src="https://www.svgrepo.com/show/452106/star.svg" alt="">
          </div>

          <button onclick="getRecipe('${recipe._id}')">Know more</button>
  
          <button onclick="updateRecipe('${recipe._id}')">Update</button>
          <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
        </div>
      `;
    });

    if(!res.data.length){
      list.innerHTML = <p id='error'>No recipe yet. Please create new</p>
    }
  })
  .catch(err => console.error(err));


function updateRecipe(id) {
  window.location.href = `/api/updateRecipe?id=${id}`;
}
function getRecipe(id) {
  window.location.href = `/api/recipes/getOne/${id}`;
}

function deleteRecipe(id) {
  axios.delete(`/api/recipes/${id}`)
    .then(() => location.reload());
}