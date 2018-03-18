// empty variables for later
var edamamQueryURL;
var recipeIngredients  = [];
//when #searchInput is clicked it calls a function
$("#box").on("click", "#searchInput",function(){
// resets the recipes div
    $("#recipes").empty();
// stops the page from reloading
    event.preventDefault();
// takes the user input to add to api url
    var search = "&q=" + $("#search").val().trim();
// adds the search value
    edamamQueryURL ="https://api.edamam.com/search?app_id=6b23762f&app_key=c98d0681d3cd98dc145a3437b77fa123" + search;  
// gets data from edamam api    
    $.ajax({
        url: edamamQueryURL,
        method: 'GET',
        }).then(function(response) {
        console.log(response);
// resets recipeIngredients
        recipeIngredients = [];
// gets the number of search results and sets it to var results
        var results = response.hits;
// iterates through all of the recipies
        for(i = 0; i <results.length; i++){
// gets the recipe Image
            var recipeImage = response.hits[i].recipe.image;
// gets the recipe Link
            var recipeLink = response.hits[i].recipe.url;
// gets the recipe Name
            var  recipeTitle = response.hits[i].recipe.label;
// gets the current recipe ingredients
            var recipeArray = response.hits[i].recipe.ingredientLines;
// pushes the ingredients to the recipeIngredients array
            recipeIngredients.push(recipeArray);
// template literal to create the html
            var recipeHTML = `<div class = recipeDiv><img class = "recipeImg" src =${recipeImage}><br><a class = "recipeLink" href =${recipeLink}>${recipeTitle}</a><br><button class = "addList" id = "${i}">Add to List</button><button class = "addBook" id = "${i}">Add to book</button></div>`
// appends the created html      
            $("#recipes").append(recipeHTML);
        } 
        });
});
// onclick events to add to server eventually. They currently only log to console
$("#box").on("click", ".addList",function(){
    var num = $(this).attr("id");
    var newList = recipeIngredients[num];
    console.log(newList);
});
$("#box").on("click", ".addBook",function(){
    var num = $(this).attr("id");
    var newBook = recipeIngredients[num];
    console.log(newBook);
});
