require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var songName = process.argv.slice(3).join(" ")
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var fs = require("fs");


function spot(song){
  spotify
  .search({ type: 'track', query: song , limit: 1})
  .then(function(data) {
    for(var i = 0; i < data.tracks.items.length; i++){
      var songData = data.tracks.items[i];
                //artist
      console.log("Artist: " + songData.artists[0].name);
                //song name
      console.log("Song: " + songData.name);
                //spotify preview link
      console.log("Preview URL: " + songData.external_urls.spotify);
                //album name
      console.log("Album: " + songData.album.name);
      console.log("-----------------------");
      } 
  })
  .catch(function(err) {
    console.log(err);
  });
}

function doThis(movie){
  axios.get('http://www.omdbapi.com/?t=' + songName + '&apikey=d46b001b')
  .then(function (response) {
    // handle success
    data = response.data;
    console.log("Title: " + data.Title)
    console.log("Release Year: " + data.Year)
    console.log("IMDB Rating: " + data.imdbRating)
    console.log("Rotten Tomatoes Rating: " + data.Ratings[0])
    console.log("Country of Production: " + data.Country)
    console.log("Language: " + data.Language)
    console.log("Plot: " + data.Plot)
    console.log("Actors: " + data.Actors)
  })
}


if (command === "spotify-this-song"){
spotify
  .search({ type: 'track', query: songName , limit: 1})
  .then(function(data) {
    for(var i = 0; i < data.tracks.items.length; i++){
      var songData = data.tracks.items[i];
                //artist
      console.log("Artist: " + songData.artists[0].name);
                //song name
      console.log("Song: " + songData.name);
                //spotify preview link
      console.log("Preview URL: " + songData.external_urls.spotify);
                //album name
      console.log("Album: " + songData.album.name);
      console.log("-----------------------");
      } 
  })
  .catch(function(err) {
    console.log(err);
  });
  
}

if (command === "movie-this"){
  axios.get('http://www.omdbapi.com/?t=' + songName + '&apikey=d46b001b')
  .then(function (response) {
    // handle success
    data = response.data;
    console.log("Title: " + data.Title)
    console.log("Release Year: " + data.Year)
    console.log("IMDB Rating: " + data.imdbRating)
    console.log("Rotten Tomatoes Rating: " + data.Ratings[0])
    console.log("Country of Production: " + data.Country)
    console.log("Language: " + data.Language)
    console.log("Plot: " + data.Plot)
    console.log("Actors: " + data.Actors)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
} 


if (command === "do-what-it-says"){
  fs.readFile('./random.txt', 'utf8', function(err, contents) {
    console.log(contents);
    data = contents.split(",")
    spot(data[1]);
});
}

fs.appendFile('log.txt', command, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
