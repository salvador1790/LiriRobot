require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var songName = process.argv.slice(2).join(" ")
var spotify = new Spotify(keys.spotify);


spotify
  .search({ type: 'track', query: songName , limit: 5})
  .then(function(response) {
    console.log(JSON.stringify(response,null,2));
  })
  .catch(function(err) {
    console.log(err);
  });
  