//getting the API KEYS CONFIGURATION:
require("dotenv").config();

//LOADING key.js
var keys = require("./key.js");

//Twitter Loading:
var Twitter = require('twitter');
//End of Twitter

//require spotify:
var Spotify = require('node-spotify-api');
//end of spotify

//request library:
var request = require("request");

//reading file system:
var fs = require("fs");

//making constructive objects:
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


//process argv:
var command = process.argv[2];

// spotify
//   .search({ type: 'track', query: 'Whats Love' })
//   .then(function(response) {
//     console.log(response.tracks);
//   })
//   ;









// * `my-tweets`
//twitter starts here:
if (command == "my-tweets") {
    //twitter testing:
    var params = { screen_name: 'Fact', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //tweets is an array.
            for (var i = 0; i < tweets.length; i++) {

                var sep = (i + 1) + ". -------------";

                var theDate = tweets[i].created_at;

                var theTXT = tweets[i].text;

                var CC = "\n" + sep + "\n" + theDate + "\n" + theTXT + "\n";

                console.log(CC);

                //we should append theTXT value to the random.txt file later::
                appendData(command + " " + process.argv[3]+ "\n");
                appendData(CC);
            }

        } else {
            console.log(error);
        }
    });

}//twitter ends here



// * `spotify-this-song`
if (command == "spotify-this-song") {
    var song = process.argv[3];

    spotify.search({ type: 'track', query: song, limit: 20 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks.items);
        for (var i = 0; i < data.tracks.items.length; i++) {
            var thesong = data.tracks.items[i];
            //artist(s)
            var artistsObj = thesong.artists;
            var artistsCatch = "";
            // console.log(artistsObj);
            for (var x = 0; x < artistsObj.length; x++) {
                artistsCatch = artistsCatch + artistsObj[x].name + " | ";
            }
            //artist(s)
            // console.log(artistsCatch);
            //song name
            // console.log(thesong.name);
            //preview link
            // console.log(thesong.preview_url);
            //album
            // console.log(thesong.album.name);
            var saperator = (i + 1) + ". ------------";
            var SongTxt = "\n" + saperator + "\nArtist(s): " + artistsCatch + "\nSong Name: " + thesong.name + "\nPreview Link: " + thesong.preview_url + "\nAlbum: " + thesong.album.name + "\n";
            console.log(SongTxt);

            //save the SontTxt values to random.txt file later:
            appendData(command + " " + process.argv[3]+ "\n");
            appendData(SongTxt);

        }

    });


}




// * `movie-this`
if (command == "movie-this") {
    movieName = process.argv[3];
    imdbKey = "261fcfc3"; // just works 99 times
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + imdbKey, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log("");
            var saperator = "---------";
            // console.log(saperator);
            var Title = "Title: " + JSON.parse(body).Title
            // console.log(Title);
            var Year = "Year: " + JSON.parse(body).Year;
            // console.log(Year);
            var Rated = "Rated: " + JSON.parse(body).Rated;
            // console.log(Rated);
            var imdbRatings = "imdbRatings: " + JSON.parse(body).imdbRating;
            // console.log(imdbRatings);
            var Country = "Country: " + JSON.parse(body).Country
            // console.log(Country);
            var Language = "Language: " + JSON.parse(body).Language;
            // console.log(Language);
            var Plot = "Plot " + JSON.parse(body).Plot;
            // console.log(Plot);
            // console.log(saperator);
            // console.log("");

            var movieTxt = "\n" + saperator + "\n" + Title + "\n" + Year + "\n" + Rated + "\n" + imdbRatings + "\n" + Country + "\n" + Language + "\n" + Plot + "\n" + saperator + "\n";
            console.log(movieTxt);

            //save the movieTxt to the random.txt file
            appendData(command + " " + process.argv[3]+ "\n");
            appendData(movieTxt);
        }
    });


}
// * `do-what-it-says`

if (command == "do-what-it-says") {
    //load the data from random.txt
    fs.readFile("./random.txt", "utf8", function (err, data) {
        console.log(data);
    });
}

//function for appending data to random.txt:
function appendData(data) {
    fs.appendFile('random.txt', data, (err) => {
        if (err) throw err;
    });
}