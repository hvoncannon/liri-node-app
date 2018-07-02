// import { twitter } from "./keys.js";
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userQuery = process.argv.slice(3).join(" ");
var search = process.argv[2];

if (search === 'my-tweets') {
    var params = { screen_name: 'bootcamp_dev' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("---------------------------")
                console.log("I tweeted: " + tweets[i].text);
                console.log("On: " + tweets[i].created_at);
            }
        }
        else {
            console.log(error);
            console.log(keys.twitter);
        }
    });
}

if (search === 'spotify-this-song' && !userQuery) {
    spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("Artist: " + data.tracks.items[5].artists[0].name);
        console.log("Track Title: " + data.tracks.items[5].name);
        if (!data.tracks.items[5].preview_url) {
            console.log("Track Preview is Unavailable");
        }
        else if (data.tracks.items[5].preview_url) {
            console.log("Track Preview: " + data.tracks.items[5].preview_url);
        }
        console.log("Album: " + data.tracks.items[5].album.name);
    });
}

if (search === 'spotify-this-song' && userQuery) {
    spotify.search({ type: 'track', query: userQuery }, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track Title: " + data.tracks.items[0].name);
        if (!data.tracks.items[0].preview_url) {
            console.log("Track Preview is Unavailable");
        }
        else if (data.tracks.items[0].preview_url) {
            console.log("Track Preview: " + data.tracks.items[0].preview_url);
        }
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

if (search === 'movie-this' && !userQuery) {
    request("http://www.omdbapi.com/?t=Mr.nobody&apikey=trilogy", function (err, response, body) {
        var formResponse = JSON.parse(body);
        console.log("Title: " + formResponse.Title);
        console.log("Year Released: " + formResponse.Year);
        console.log("IMBD Rating: " + formResponse.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + formResponse.Ratings[1].Value);
        console.log("Country: " + formResponse.Country);
        console.log("Language: " + formResponse.Language);
        console.log("Plot: " + formResponse.Plot);
        console.log("Actors: " + formResponse.Actors);   
    })
}

if (search === 'movie-this' && userQuery) {
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=trilogy", function (err, response, body) {
        var formResponse = JSON.parse(body);
        console.log("Title: " + formResponse.Title);
        console.log("Year Released: " + formResponse.Year);
        console.log("IMBD Rating: " + formResponse.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + formResponse.Ratings[1].Value);
        console.log("Country: " + formResponse.Country);
        console.log("Language: " + formResponse.Language);
        console.log("Plot: " + formResponse.Plot);
        console.log("Actors: " + formResponse.Actors);   
    })
}

if (search === 'do-what-it-says') {
    fs.readFile('./random.txt', 'utf8', function read(err, data) {
        var dataArr = data.split(',')
        spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            if (!data.tracks.items[0].preview_url) {
                console.log("Track Preview is Unavailable");
            }
            else if (data.tracks.items[0].preview_url) {
                console.log("Track Preview: " + data.tracks.items[0].preview_url);
            }
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    })
}