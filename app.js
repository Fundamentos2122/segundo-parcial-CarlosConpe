const formRecipe = document.getElementById("form-recipe");
const listRecipes = document.getElementById("view");
let ingredientsList = []
let btnAddIngredient = document.getElementById("newIng")
const keyList = "recipeList"

document.addEventListener("DOMContentLoaded", () => {
    formRecipe.addEventListener("submit", submitRecipe);
    btnAddIngredient.addEventListener("click", addIngredient);
    paintRecetas();
    hideElements();
});

function submitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();


    let recipe = {
        id: Date.now(),
        title: formRecipe["title"].value,
        image: formRecipe["img_url"].value,
        description: formRecipe["description"].value,
        ingredients: getIngredients()
    };

    console.log(recipe);

    let list = getRecipes();

    list.push(recipe);

    localStorage.setItem(keyList, JSON.stringify(list));

    paintRecetas();

    formRecipe["title"].value = ''
    formRecipe["img_url"].value = ''
    formRecipe["description"].value = ''
}

function getRecipes() {
    let list = JSON.parse(localStorage.getItem(keyList));
    if (list === null) {
        return [];
    } else {
        return list
    }
}

function paintRecetas() {
    
    let list = getRecipes();

    let html = "";
    html += `
    <h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>
    `
    for (var i = 0; i < list.length; i++) {

        
        let listIngredientsHTML = ""
        for(var j =0;j<list[i].ingredients.length;j++){
            listIngredientsHTML +=  `<li>${list[i].ingredients[j].name}</li>`
        }

        html += `
        <div class="[ row ] [ flex ]" data-state="wrap" id="${list[i].id}-1">
            <div class="[ col ]">
                <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${list[i].id}">
                    <img src="${list[i].image}" alt="">
                    <div class="[ flow ]">
                        <h5>${list[i].title}</h5>
                        <div class="[ flex ]" data-state="justify-between">
                            <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
                            <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <h1 class="[ color-primary ] [ text-center ]">Receta</h1>

        <div class="[ recipe ] [ flex ] [ shadow ]" id="${list[i].id}">
            <div class="recipe-img">
                <img src="${list[i].image}" alt="">
            </div>
            <div class="[ recipe-info ] [ flow ]">
                <h2>${list[i].title}</h2>
                <div class="[ text-justify ]">${list[i].description}</div>
                <h5>Ingredientes</h5>
                <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                    <li>${listIngredientsHTML}</li>
                </ul>
            </div>
        </div>

        <div class="text-right">
            <button class="[ btn ]" data-state="primary" onclick="paintRecetas()">Volver al listado</button>
        </div>
        `
    }
    listRecipes.innerHTML = html;

    let recipes = document.getElementsByClassName("[ row ] [ flex ]");
    for(var i = 0; i<recipes.length;i++){
        recipes[i].style.display = "block"
    }
    let titlePop = document.getElementsByClassName("[ color-primary ] [ text-center ]")
    console.log(titlePop);
    titlePop[0].style.display = "block"
    hideElements();
}

function getRecipes() {
    let list = JSON.parse(localStorage.getItem(keyList));
    if (list === null) {
        return [];
    } else {
        return list
    }
}

function addIngredient() {
    let ingredients = document.getElementById("ingredient-temp-list");
    let ingredientName = document.getElementById("ingredient-name");

    ingredientElement = {
        id: Date.now(),
        name: ingredientName.value
    }

    let ingredient = `
    <li class="[ bg-white color-gray ]" id='${ingredientElement.id}'>
        ${ingredientName.value}
        <button class="close" type="button" onclick="deleteIngredient(${ingredientElement.id})">X</button>
    </li>`

    ingredients.innerHTML = ingredients.innerHTML + ingredient;
    ingredientsList.push(ingredientElement)
    ingredientName.value = ''
}

function getIngredients() {
    tmpIngredientsList = ingredientsList;
    ingredientsList = []
    return tmpIngredientsList;
};

function getIngredientsNoTransform() {
    return ingredientsList;
};

function deleteIngredient(id) {
    console.log(ingredientsList)
    let ingredient = document.getElementById(`${id}`);
    let ingredientsStored = getIngredientsNoTransform();
    ingredientsStored = ingredientsStored.filter(i => i.id !== id);

    setTimeout(() => {
        ingredient.remove();
    }, 600)

    ingredientsList = ingredientsStored;
    console.log(ingredientsList)
}


function getRecipe(id){

    let list = getRecipes();
    list = list.filter(i => i.id === id);

    let hiddenElements = document.getElementsByClassName("[ recipe ] [ flex ] [ shadow ]")
    for(var i = 0; i<hiddenElements.length;i++){
        if(`${list[0].id}` === hiddenElements[i].id)
        hiddenElements[i].style.display = "flex"
    }

    let btnVolver = document.getElementsByClassName("text-right");
    let titlePop = document.getElementsByClassName("[ color-primary ] [ text-center ]")
    
    btnVolver[0].style.display = "block"
    titlePop[1].style.display = "blocks"

    let recipes = document.getElementsByClassName("[ row ] [ flex ]");
    for(var i = 0; i<recipes.length;i++){
        recipes[i].style.display = "none"
    }

    titlePop[0].style.display = "none"
}

function hideElements(){
    let hiddenElements = document.getElementsByClassName("[ recipe ] [ flex ] [ shadow ]")
    let btnVolver = document.getElementsByClassName("text-right");
    let titlePop = document.getElementsByClassName("[ color-primary ] [ text-center ]")

    
    
    for(var i = 0; i<hiddenElements.length;i++){
        hiddenElements[i].style.display = "none"
    }

    if(btnVolver.length>0){
        btnVolver[0].style.display = "none"
    }
    if(titlePop.length>1){
        titlePop[1].style.display = "none"
    }
    
}

function deleteRecipe(id){
    let list = getRecipes();
    list = list.filter( i => i.id !==id);

    localStorage.setItem(keyList, JSON.stringify(list));
    
    let recipe = document.getElementById(`${id}-1`);
    console.log(recipe)
    recipe.style.display = "none"
    recipe.style.visibility = "hidden"
setTimeout(() => {
    recipe.remove();
}, 1000)
}