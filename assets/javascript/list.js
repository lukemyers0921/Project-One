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
    doc.save('grocery_list.pdf');
});
}
// when the #pdfBtn button is pressed it will run our genPDF function
$("#box").on("click", "#pdfBtn",function(){
genPDF();
});

database.ref('List/').orderByChild("dateAdded").on("child_added", function (snapshot) {
    var data = snapshot.val();
    console.log(data);
    var length = data.Object.recipe
    var td = "";
    for(i =0; i < length.length; i++){
        td = td + "<tr><td>" + length[i] + "</td></tr>"
    }
    console.log(td);
  
    var newBookEntry = 
    `
    <div class = "row">
        <div class = "col-xs-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <strong>${data.Object.title}</strong>
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
        </div>
        </div>
        </div>
    `
    $("#tableHolder").append(newBookEntry);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});