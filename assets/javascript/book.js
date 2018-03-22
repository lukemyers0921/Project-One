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
//creating a function to generate our pdf
function genPDF() {
// grabs the id tableHolder 
html2canvas(document.getElementById("tableHolder")).then(function(canvas) {
// creates our img
    var img = canvas.toDataURL('image/png');
// creats our pdf
    var doc = new jsPDF();
// adds our img to pdf
    doc.addImage(img, 'JPEG', 20, 20);
// saves pdf argument is title of download
    doc.save('recipe_book.pdf');
});
}
// when the #pdfBtn button is pressed it will run our genPDF function
$("#box").on("click", "#pdfBtn",function(){
event.preventDefault();
$(".hide").hide();
genPDF();
$(".hide").show();
});

database.ref('Book/').orderByChild("dateAdded").on("child_added", function (snapshot) {
    
    var data = snapshot.val();
    console.log(data);
    var length = data.Object.recipe
    var td = "";
    for(i =0; i < length.length; i++){
        td = td + "<tr><td class =" + i + ">" + length[i] + "</td></tr>"
    }
  
    var newEntry = 
    `
    <div class = "row" >
        <div class = "col-xs-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <strong class = "title">${data.Object.title}</strong>
                </h3>
            </div>
            <div class="panel-body">
                <table class="table table-hover">
                    <thead>
                        <tr><th>Ingredients</th></tr>
                        ${td}
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
                <img class = "recipeImg" src = "${data.Object.image}">
                
            </div>
            <button class = "hide addBook btn btn-success">Add to List.</button>
            <button class = "hide delete btn btn-danger">Delete from book.</button>
        </div>
        </div>
        </div>
        <hr>
    `
    $("#tableHolder").append(newEntry);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});
$("#box").on("click", ".addBook",function(){
    event.preventDefault();
   var recipe = [];
   var titleT = $(this).parent("div").find(".title").text();
   var image = $(this).parent("div").find(".recipeImg").attr("src")
   var truthy = true;
   for(i = 0; truthy == true; i++){
    var string = $(this).parent("div").find("." + i).text();
    if(string !== ""){
    console.log(string);
    recipe.push(string);
    } else {
        truthy = false;
    }
   }
    var newBook = {
        recipe: [],
        title: "",
        image: "",
        
    };
    
    newBook.recipe = recipe;
    newBook.title = titleT;
    newBook.image = image;
    var title = newBook.title;
    firebase.database().ref('List/' + title).set({
     Object: newBook,
     dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });        
    });
    $("#box").on("click", ".delete",function(){
        event.preventDefault()
        console.log("delete")
        var title = $(this).parent("div").find(".title").text();
        $(this).closest(".row").remove();
        firebase.database().ref('Book/' + title).remove();
    });