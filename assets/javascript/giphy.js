//create an array of topics I want giphy to search for
// $(document).ready(function() {
var topics = ["Goodfellas" , "Scarface" , "The Godfather" , "A Bronx Tale" , "Boyz in da Hood" , "Menace 2 Society" , "The Departed" , "Pulp Fiction" , "Blood In Blood Out" , "Reservoir Dogs"];

//make a function that loops through the array and creates a button for each item
function createButton() {

$("#buttons-view").empty();
	for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("value", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
	}
}

createButton();

$(document).on("click", "button" , function() {

//create a function that calls the giphy api for each movie
console.log(this.value);

// var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + this.value;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + this.value + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
    .done(function(response) {

        var results = response.data;

    for (var i = 0; i < results.length; i++) {
        console.log(response);
        var imageUrl = response.data[i].images.downsized_still.url;
        var movingUrl = response.data[i].images.downsized_large.url
        var Image = $("<img height='200' width='250'>");
        var gifDiv = $("<div>");
        Image.attr("src" , imageUrl);
        Image.attr("alt" , "image");
        Image.attr("class" , "gifs");
        Image.attr("data-state" , "still");
        Image.attr("data-still" , imageUrl);
        Image.attr("data-animate" , movingUrl);
        // $("#images").append(Image);
        
//create div for rating
        var p = $("<p>").text("Rating: " + response.data[i].rating);
        gifDiv.append(p);
        gifDiv.append(Image);
        $(".container").prepend(gifDiv);
    }

  });

});

//make my submit button add another hood movie

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    topics.push(movie);
    createButton();

});

// animate and pause gifs
$(document).on("click", "img.gifs" , function() {
    console.log("joe");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


