var data=require('./keys.js');
var keys=data.twitterKeys;
var Twitter = require('twitter');
var client=new Twitter(keys);
var spotify = require('spotify');

switch(process.argv[2]){
  case 'my-tweets':
  client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=gael7a&count=20', function(error, tweets, response) {
  if(error) throw error;
  for(i=0; i<tweets.length; i++){
  console.log("Tweet ["+i+"]: "+tweets[i].text);
  }
  });
  break;

  case 'spotify-this-song':
  if (process.argv[3]===undefined) {
    console.log("'The Sign' by Ace of Base");
  } else {
  spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var track=data.tracks.items;
    console.log("Artist(s): "+track[0].artists[0].name +"\nSong: "+ track[0].name +"\nPreview: "+ track[0].preview_url +"\nAlbum: "+ track[0].album.name);
  });
}
  break;

  case 'movie-this':
  break;
  case 'do-what-it-says':
  break;
}
