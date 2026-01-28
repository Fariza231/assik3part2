const list = document.getElementById("recipe-list");

axios.get("/api/recipes/data")
  .then(res => {
    console.log(1)
    console.log(res.data);
    // const container = document.getElementById("recipes");

    list.innerHTML = "";

    res.data.forEach(recipe => {
      list.innerHTML += `
        <div class="recipe__card">

          <h5 class="name">Name: ${recipe.name}</h5>

          <div id="flex">
            <p>Type: ${recipe.type}</p>
            <p>Cooking time: ${recipe.cookingTime}</p>   
          </div>
          
          <div id="flex">
            <p>Category: ${recipe.category}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
          </div>
          
          <div id="flex">
            <p>Cuisine: ${recipe.cuisine}</p>
            <p>Instructions: ${recipe.instructions}</p>
          </div>

          <div class="recipe__card-center">
            <div class="recipe__card-dif">${recipe.difficulty}</div>
            <img id="star" src="https://www.svgrepo.com/show/452106/star.svg" alt="">
          </div>
  
          <button onclick="editRecipe('${recipe._id}')">Update</button>
          <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
        </div>
      `;
    });

    if(!res.data.length){
      list.innerHTML = `<p id='error'>No recipe yet. Please create new</p>`
    }
  })
  .catch(err => console.error(err));


function editRecipe(id) {
  window.location.href = `/api/updateRecipe?id=${id}`;
}

function deleteRecipe(id) {
  axios.delete(`/api/recipes/${id}`)
    .then(() => location.reload());
}
