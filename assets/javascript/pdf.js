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