var topics = ['South Park', 'funny cats', 'zombie', 'llama']
// function that adding buttons with movies from tvShow array
  function renderButtons() {
    $('#topic-buttons').empty();
    for (i = 0; i < topics.length; i++) {
    createButtons(topics[i]);
    }
  }
  renderButtons();

//function that creates new buttons with class="bShow" and appending new buttons to existing ones
    function createButtons(tName) {
      var b = $('<button>');
      b.attr('class', 'bTopics')
      b.text(tName);
      $("#topic-buttons").append(b);
};
      
//when user click on button with show it will call ajax and return 10 results with ratings
  $(document).on("click", ".bTopics", function() {
    var tName = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tName + "&api_key=j3efJCig105rvgYvwwxy5qVwJFvyzN4j&limit=10";
    $.ajax({
    url: queryURL,
    method: 'GET'
    }).then(function(response) {
      for (x = 0; x < response.data.length; x++) {
        console.log(response.data[x])
        var rating = $('<p>').text("Rating: " + response.data[x].rating);
        var title=$("<p>").text("Title: " + response.data[x].title)
        // var downloadB =$("<button class='downloadButton'>").text("donwload")
        var img = $("<img>")
        img.attr('src', response.data[x].images.downsized_still.url);
        img.attr('data-moving', response.data[x].images.downsized_medium.url);
        img.attr('data-static', response.data[x].images.downsized_still.url);
        // img.attr('href', response.data[x].url);
        
        var d = $('<div class="gImg">').append(rating,title, img);
        $("#gifs").prepend(d)
      }
    })
  })
//function that adding new button with new topic
    $("#add-topic").on("click", function(event) {
    var newTopic = $("#topics-input").val();
    createButtons(newTopic);
    topics.push(newTopic);
    event.preventDefault();
    $("#topics-input").val("");
    });


    $(document).on("click","img" ,function(){
    var actualSrc= $(this).attr("src");
    var movingD=$(this).attr("data-moving");
    var staticD=$(this).attr("data-static");
    if (staticD==actualSrc){
      $(this).attr('src', movingD);
    }else{
      $(this).attr('src', staticD)
    }
    })