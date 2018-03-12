//Vincent DeStefano

var randomFirst = true;
var trendingFirst = true;
var searchFirst = true;
var newItems = 0;
console.log(typeof newItems);
var newerItems = 0;
console.log(typeof newerItems);

function additionalNewItems(num) {
  var num;
  num += 25;
  newItems = num;
  console.log("newitems = " + num);
  return num;
}

function additionalNewerItems(num) {
  var num;
  num += 25;
  newerItems = num;
  console.log("neweritems = " + num);
  return num;
}

function makeButton(){
  var buttonName = $("#test-input").val();
  console.log("where am i??" + buttonName);
  var listItem = $("<li>");
  listItem.addClass("nav-item");
  listItem.attr("link", buttonName);
  console.log(listItem);

  var linkList = $("<a>");
  linkList.addClass("nav-link");
  linkList.attr("href = ", "#");
  linkList.attr("link", buttonName);
  linkList.text(buttonName);

  $("#links").append(linkList);
  listItem.append(linkList);


}

$(".trending").on("click", function(event) {
  console.log(this);

  additionalNewerItems(newerItems);
  var trendingSearchUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&limit=" +
    newerItems +
    "&rating=PG-13";
  console.log(newerItems + "this");

  //make limit number a variable and increment that once the trending button is clicked returns the same trending gifs not new ones

  $.ajax({
    url: trendingSearchUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    if (trendingFirst) {
      trendingFirst = false;
      for (var i = 0; i < 25; i++) {
        var divTrending = $("<div>");
        divTrending.addClass("col-3");

        var imageStillTrending = response.data[i].images.fixed_height_still.url;
        console.log(imageStillTrending);
        console.log(i);

        var imageDivTrending = $("<img>");
        imageDivTrending.addClass("images");
        imageDivTrending.attr("src", imageStillTrending);

        $("#test").append(imageDivTrending);
      }
      console.log(newItems);
    } else {
      additionalNewItems(newItems);

      for (var i = newItems; newItems < newerItems; i++) {
        console.log("this is working" + i);
        var divTrending = $("<div>");
        divTrending.addClass("col-3");

        var imageStillTrending = response.data[i].images.fixed_height_still.url;
        console.log(imageStillTrending);

        var imageDivTrending = $("<img>");
        imageDivTrending.addClass("images");
        imageDivTrending.attr("src", imageStillTrending);

        $("#test").append(imageDivTrending);
      }
    }
  });
});

$("#find-gif").on("click", function(event) {
  event.preventDefault();

  var search = $("#test-input").val();
  var rating = $("#selected-Rating").val();
  var searchingFor = "";
  var offset = Math.floor(Math.random() * 125);
  console.log("this is offset: " + offset);

  console.log(search);
  console.log(rating);
  var count = $("#selected-count").val();
  console.log(count);

  if ($("#find-gif").hasClass("random bg-warning")) {
    var querySearchURL =
      "https://api.giphy.com/v1/gifs/random?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&tag=&limit=25&offset=" +
      offset +
      "rating=" +
      rating;

    console.log(querySearchURL);
  }

  if ($("#find-gif").hasClass("search")) {
    searchingFor = "search?";
    var querySearchURL =
      "https://api.giphy.com/v1/gifs/" +
      searchingFor +
      "api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&q=" +
      search +
      "&limit=" +
      count +
      "&offset=" +
      offset +
      "&rating=" +
      rating +
      "&lang=en";
    console.log(querySearchURL);
  }

  $.ajax({
    url: querySearchURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    if ($("#find-gif").hasClass("random bg-warning")) {
      var testImage = response.data.images.fixed_height_still.url;
      console.log(testImage);
      $("#test").append("<img  class = 'images' src =" + testImage + ">");
    }

    if ($("#find-gif").hasClass("search")) {
      for (var i = 0; i < count; i++) {
        var divSection = $("<div>");
        divSection.addClass("col-3");

        var imageStill = response.data[i].images.fixed_height_still.url;
        console.log(imageStill);
        var previewGif = response.data[i].images.preview_gif.url;

        var testRating = response.data[i].rating;
        console.log(testRating);

        var imageDiv = $("<img>");
        imageDiv.addClass("images");
        imageDiv.attr("src", imageStill);

        $("#test").append(imageDiv);

        console.log(imageDiv);
      }
    }
  });
});

$(".random").on("click", function(event) {
  console.log(this);

  var randomUrl =
    "https://api.giphy.com/v1/gifs/random?api_key=af812ge2IP7qhl9AEIkTMPREE6ZFyTyq&tag=&rating=";

  $.ajax({
    url: randomUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var testImageRandom = response.data.images.fixed_height_still.url;
    console.log(testImageRandom + "this");
    $("#test").append("<img  class = 'images' src =" + testImageRandom + ">");
  });
});

$("#randomTest").on("click", function(event) {
  $("#find-gif").toggleClass("search");
  $("#find-gif").toggleClass("random bg-warning border-danger ");
  $("#test-input").val("");
});

$(document).on("click", ".images", function() {
  var src = $(this).attr("src");
  if ($(this).hasClass("playing")) {
    //stop
    $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
    $(this).removeClass("playing");
  } else {
    //play
    $(this).addClass("playing");
    $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
  }
});


$(document).on("click", function(event){
console.log(this);
});