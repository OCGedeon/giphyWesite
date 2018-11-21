$(document).ready(function() {

  var topics = ["Ghost In The Shell", "Ninja Scroll", "Dragon Ball", "Dragon Ball Z", "Kyo", "Cowboy BeBop", "Deathnote", "Tales From Earthsea", "Origin", "Tokyo", "Evangelion", "Karas", "Witchblade", "Ponyo", "The Skull Man", "Tripping The Rift", "Guyver", "Trinity Blood", "Casshern", "Devilman", "The Maxx"];	

  
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('anime');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();


$(document).on('click', '.anime', function() {

    
    var anime = $(this).html(); 
    // console.log(manga);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL);

    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        //console.log(results);
       
        $('#movies-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        
        var rating = results[j].rating;
            // console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#movies-view').prepend(displayRated);
  } 

}); 

        
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 

      });  

          
        $(document).on('click', '#add-movie', function(){
            if ($('#movie-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); 