var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: "xoxb-48207324887-zHM95s02I9YvfxEBsBoAnFYO"
})
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
  else {
  console.log("Connected... Let's the darkness consumes you...");
  }
});

//Artorias is listening to ""
controller.hears(["Poop", "^.poop.$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  console.log("You dirty bastard...");
  bot.reply(message,'NOPE, DON\'T YOU DARE!');
});
