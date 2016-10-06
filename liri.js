var data = require('./keys.js');
var fs = require('fs');
var keys = data.twitterKeys;
var request = require('request');
var Twitter = require('twitter');
var client = new Twitter(keys);
var spotify = require('spotify');
var title = process.argv[3];
for (i = 4; i < process.argv.length; i++) {
    title = title + '+' + process.argv[i];
}
var liri = function() {
    switch (process.argv[2]) {
        case 'my-tweets':
            client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=gael7a&count=20', function(error, tweets, response) {
                if (error) throw error;
                for (i = 0; i < tweets.length; i++) {
                    console.log("Tweet [" + i + "]: " + tweets[i].text);
										log("\nTweet [" + i + "]: " + tweets[i].text);
								}
            });
            break;

        case 'spotify-this-song':
            if (title === undefined) {
								title="the+sign+ace";
                console.log("'The Sign' by Ace of Base");
            }
                spotify.search({
                    type: 'track',
                    query: title
                }, function(err, data) {
                    if (err) {
                        console.log('Error occurred: ' + err);
                        return;
                    }
                    var track = data.tracks.items;
										logInfo="\nArtist(s): " + track[0].artists[0].name + "\nSong: " + track[0].name + "\nPreview: " + track[0].preview_url + "\nAlbum: " + track[0].album.name;
                    console.log(logInfo);
										log(logInfo);
								});
            break;

        case 'movie-this':
            if (title === undefined) {
                title = "mr+nobody";
            }
            request('http://www.omdbapi.com/?t=' + title + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
										logInfo="\nTitle: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot+"Actors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL;
										log(logInfo);
								}
            });
            break;
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function(error, data) {
								logInfo=process.argv[2];
								log(logInfo);
								var random = data.split(',');
                process.argv[2] = random[0];
								title=random[1];
                console.log(process.argv[2]);

								liri();
                //}
            });
            break;
    }
};

liri();

var log=function(logInfo){
fs.appendFile("log.txt", logInfo, function onFinished(err){
	if(err){
	return console.log(err);
	}
});
};
