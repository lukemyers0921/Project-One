// Initialize Firebase
var config = {
    apiKey: "AIzaSyBX5Pdyul0qQ-Vw1uIOdlPJlwzOnG-v4HI",
    authDomain: "project-1-fire.firebaseapp.com",
    databaseURL: "https://project-1-fire.firebaseio.com",
    projectId: "project-1-fire",
    storageBucket: "project-1-fire.appspot.com",
    messagingSenderId: "945508833198"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
//  ------
// empty variables for later
function containsSpecialCharacters(str){
    var validate = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return validate.test(str);
}
var edamamQueryURL;
var recipeIngredients  = [];
//when #searchInput is clicked it calls a function
$("#box").on("click", "#searchInput",function(){
// resets the recipes div
   $("#recipes").empty();
// stops the page from reloading
   event.preventDefault();
// takes the user input to add to api url
   var validate = $("#search").val().trim();
   var search = "&q=" + validate
   var specialChar = containsSpecialCharacters(validate);
// adds the search value
   edamamQueryURL ="https://api.edamam.com/search?app_id=3fba54bc&app_key=517c8302846eab765baf6fc1d2c9d2f9" + search;  
// gets data from edamam api 
if (validate == "") {
    $(".lead").html("Enter a recipe to search.")
    return false;
} if(specialChar) {
    $(".lead").html("Special characters are not allowed.")
    return false;
} else {
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
           var recipeData = {
               recipe: [],
               title:"",
               image:"",
           }
           recipeData.recipe = response.hits[i].recipe.ingredientLines;
           recipeData.title = response.hits[i].recipe.label;
           recipeData.image = response.hits[i].recipe.image
// pushes the ingredients to the recipeIngredients array
           recipeIngredients.push(recipeData);
// template literal to create the html
           var recipeHTML = `<div class = recipeDiv><img class = "recipeImg" src =${recipeImage}><br><a class = "recipeLink" href =${recipeLink}>${recipeTitle}</a><br><button class = "addList btn btn-success" id = "${i}">Add to List</button><button class = "addBook btn btn-success" id = "${i}">Add to book</button></div>`
// appends the created html      
           $("#recipes").append(recipeHTML);
       }
       });
    }
});
// onclick events to add to server eventually. They currently only log to console
$("#box").on("click", ".addList",function(){
    event.preventDefault();
   var num = $(this).attr("id");
   var newList = {
       recipe: [],
       title: "",
       image: "",
   };
   newList.recipe = recipeIngredients[num].recipe;
   newList.title = recipeIngredients[num].title;
   newList.image = recipeIngredients[num].image;
   console.log(newList);
   var title = newList.title;
   firebase.database().ref('List/' + title).set({
    Object: newList
  });
  
});
$("#box").on("click", ".addBook",function(){
event.preventDefault();
   var num = $(this).attr("id");
   var newBook = {
       recipe: [],
       title: "",
       image: "",
       
   };
   newBook.recipe = recipeIngredients[num].recipe;
   newBook.title = recipeIngredients[num].title;
   newBook.image = recipeIngredients[num].image;
   console.log(newBook);
   var title = newBook.title;
   firebase.database().ref('Book/' + title).set({
    Object: newBook,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });
});
