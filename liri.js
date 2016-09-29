var data=require('./keys.js');
var keys=data.twitterKeys;
var Twitter = require('twitter');
var client=new Twitter(keys);

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
  break;
  case 'movie-this':
  break;
  case 'do-what-it-says':
  break;
}
