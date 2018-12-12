require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var moment = require("moment");
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var fs = require("fs");



// Store all of the arguments in an array
var nodeCommand = process.argv [2]
var search = process.argv.slice(3).join(" ")

function bandcall(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL)
        .then(function(concertResponse){

            var bandDeets = concertResponse.data
            // console.log(bandDeets)

            var bVenue = bandDeets[0].venue.name;
            console.log("Venue: " + bVenue)

            var bLocation = bandDeets[0].venue.city;
            console.log("Venue Location: " + bLocation)

            var bDate = bandDeets[0].datetime;
            bDate = moment(bDate).format("dddd, MMMM Do YYYY, h:mm A")
            console.log("Venue Date: " + bDate)
        });
};

// Create the liri constructor
// var liriResults = function() {
//     // divider will be used as a spacer between the tv data we print in log.txt
//     var divider = "\n------------------------------------------------------------\n\n";
  

// function bandcall (artist){
//     if (!artist) {
//         artist = "David Bowie"
//     }


// // Then run a request with axios to the OMDB API with the movie specified
// var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// // This line is just to help us debug against the actual URL.
// // console.log(queryUrl);

// axios.get(queryUrl).then(
//   function(bandResponse) {

//     var bandDeets = bandResponse.data
//      console.log("Venue: " + bandDeets[0].venue.name);
    
//   }
// );
    
// }


function omdbcall (movieName){
    if (!movieName) {
        movieName = "Mr. Nobody"
    }


// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("imdbRating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1]);
    console.log("Country Where Movie Produced: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    // console.log (response.data);
  }
);
    
}

    function spotifySong (songName){
    if (!songName) {
        songName = "The Sign"
    }
    
    var spotify = new Spotify(keys.spotify)
    spotify.search({ type: 'track', query: search}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
     
    var songInfo = data.tracks.items[0]; 
    console.log("Artist(s): " + songInfo.artists[0].name);
    console.log("Song Name: " + songInfo.name);
    console.log("Song Preview Link: " + songInfo.preview_url);
    console.log("Album from: " + songInfo.album.name);
  }
);
}

if (nodeCommand == "movie-this"){
    omdbcall (search)
} else if (nodeCommand == "concert-this"){
     bandcall (search)
} else if (nodeCommand == "spotify-this-song"){
    spotifySong (search)
 }else if (nodeCommand == "do-what-it-says"){
     dothis (search);
}


    function dothis (){
     
    
    fs.readFile("random.txt", "utf8", function(error, data){
        // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      } 
      
      console.log(data)

      var dataArr = data.split(",");

    })
}   
   


// var text = process.argv[2];

// // Next, we append the text into the "sample.txt" file.
// // If the file didn't exist, then it gets created on the fly.
//   fs.appendFile("sample.txt", text, function(err) {

//   // If an error was experienced we will log it.
//   if (err) {
//     console.log(err);
//   }

//   // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//   else {
//     console.log("Content Added!");
//   }

// });

// // Append showData and the divider to log.txt, print showData to the console
// fs.appendFile("log.txt", liriResults + divider, function(err) {
//     if (err) throw err;
   
//   });


    
