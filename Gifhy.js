//Vincent DeStefano

var searchOrRandom = true;
var randomTerm = false;


$(".trending").on("click",function(event){
console.log(this);

 var trendingSearchUrl = "https://api.giphy.com/v1/gifs/trending?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&limit=25&rating=PG-13"; 


//make limit number a variable and increment that once the trending button is clicked returns the same trending gifs not new ones


$.ajax({
  url: trendingSearchUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);

  for(var i  = 0; i < 25; i++){
        
    var divTrending = $("<div>");
    divTrending.addClass("col-3");

    var imageStillTrending = response.data[i].images.fixed_height_still.url;
    console.log(imageStillTrending);
    var previewGifTrending = response.data[i].images.preview_gif.url;

    

  var imageDivTrending = $("<img>");
  imageDivTrending.addClass("col-3 images");
  imageDivTrending.attr("src", imageStillTrending);
  
  $("#test").append(imageDivTrending);

  console.log(imageDivTrending);
  }



  });


});

$("#find-gif").on("click", function(event) {
  event.preventDefault();

  var search = $("#test-input").val();
  var rating = $("#selected-Rating").val();
  var searchingFor = '';

  console.log(search);
  console.log(rating);
  var count = $("#selected-count").val();
  console.log(count);

if($("#find-gif").hasClass("random bg-warning")){

  var querySearchURL = "https://api.giphy.com/v1/gifs/random?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&tag=&limit=25&offset=0rating=" + rating;

    console.log(querySearchURL);
}

if($("#find-gif").hasClass("search")){

  searchingFor = "search?"
  var querySearchURL =
    "https://api.giphy.com/v1/gifs/" + searchingFor + "api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&q=" +
    search +
    "&limit=" + count + "&offset=0&rating=" + rating + "&lang=en";
    console.log(querySearchURL);
}
  

  $.ajax({
    url: querySearchURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    if($("#find-gif").hasClass("random bg-warning")){
      var testImage = response.data.images.fixed_height_still.url;
        console.log(testImage);
        $("#test").append("<img  class = 'images' src =" + testImage + ">");
    }
   
    if($("#find-gif").hasClass("search")){
      
      for(var i  = 0; i < count; i++){
        
        var divSection = $("<div>");
        divSection.addClass("col-3");
  
        var imageStill = response.data[i].images.fixed_height_still.url;
        console.log(imageStill);
        var previewGif = response.data[i].images.preview_gif.url;
  
        var testRating = response.data[i].rating;
        console.log(testRating);
        
  
      var imageDiv = $("<img>");
      imageDiv.addClass("col-3 images");
      imageDiv.attr("src", imageStill);
      
      $("#test").append(imageDiv);
  
      console.log(imageDiv);
      }
     
    }
    
  });
});

$("#randomTest").on("click", function(event) {
  $("#find-gif").toggleClass("search");
  $("#find-gif").toggleClass("random bg-warning border-danger ");

});


$(document).on("click", ".images", function () {

  var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }

});




