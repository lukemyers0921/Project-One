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
var y = 20;
var doc = new jsPDF()
doc.setFontSize(40)
doc.text(60,y,"Grocery List")
y = y + 20;
function genPDF(){
   var pdfPageTotal = document.querySelectorAll(".pdf");
   var pdfPages = [];
   var truthiest = true;
   for(var i = 0; truthiest == true; i++){
       var j = pdfPageTotal[i];
       if(j) {
           pdfPages.push(j)
       } else {
           truthiest = false;
       }
   }
   
   
   for(var i = 0; i < pdfPages.length; i++){
    var temp = pdfPages[i];
    var title = $(temp).find(".title").text();
    console.log(title);
    var image = $(temp).find(".recipeImg")
    var truthy = true;
    doc.setFontSize(25)
    doc.text(20,y,title);
    y = y+10;
    heightCheck();

    for (j = 0; truthy == true; j++) {
        var string = $(temp).find("." + j).text();
        doc.setFontSize(12)
        if (string !== "") {
            console.log(string);
            doc.text(30,y,string);
            y = y+10;
            heightCheck();
        } else {
            truthy = false;
                       
        }
    }
    y = y + 10;
   console.log(pdfPages.length);
    
   }
   doc.save('grocery_list.pdf')
   
}
function heightCheck() {
    if(y ==280){
        y = 20;
        doc.addPage();
    }
}        
    

// when the #pdfBtn button is pressed it will run our genPDF function
$("#box").on("click", "#pdfBtn", function () {
    event.preventDefault();
    genPDF();
});

database.ref('List/').orderByChild("dateAdded").on("child_added", function (snapshot) {

    var data = snapshot.val();
    console.log(data);
    var length = data.Object.recipe
    var td = "";
    for (i = 0; i < length.length; i++) {
        td = td + "<tr><td class =" + i + ">" + length[i] + "</td></tr>"
    }

    var newEntry =
        `
    <div class = "row pdf">
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
            <button class = "hide addBook btn btn-success">Add to Book.</button>
            <button class = "hide delete btn btn-danger">Delete from list.</button>
        </div>
        </div>
        </div>
        <hr>
    `
    $("#tableHolder").append(newEntry);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});
$("#box").on("click", ".addBook", function () {
    event.preventDefault();
    var recipe = [];
    var titleT = $(this).parent("div").find(".title").text();
    var image = $(this).parent("div").find(".recipeImg").attr("src")
    var truthy = true;
    for (i = 0; truthy == true; i++) {
        var string = $(this).parent("div").find("." + i).text();
        if (string !== "") {
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
    firebase.database().ref('Book/' + title).set({
        Object: newBook,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });
});
$("#box").on("click", ".delete", function () {
    event.preventDefault()
    console.log("delete")
    var title = $(this).parent("div").find(".title").text();
    $(this).closest(".row").remove();
    firebase.database().ref('List/' + title).remove();
});
