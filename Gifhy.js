//Vincent DeStefano

$("#find-gif").on("click", function(event) {
  event.preventDefault();

  var search = $("#test-input").val();
  console.log(search);

  var count = 5;

  var querySearchURL =
    "https://api.giphy.com/v1/gifs/search?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&q=" +
    search +
    "&limit=25&offset=0&rating=PG&lang=en";

  console.log(querySearchURL);

  $.ajax({
    url: querySearchURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for(var i  = 0; i < count; i++){
      
      var divSection = $("<div>");
      divSection.addClass("col-4");

      var imageStill = response.data[i].images.fixed_height_still.url;

      var previewGif = response.data[i].images.preview_gif.url;
      console.log(imageStill);

    var imageDiv = $("<img>");
    imageDiv.addClass("col-4 images");
    imageDiv.attr("src", imageStill);
    imageDiv.data("imageNum", previewGif);
    
    $("#test").append(imageDiv);

    console.log(imageDiv);
    
    
    }
    
  });
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




