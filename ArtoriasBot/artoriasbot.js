var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: "bot-TOKEN"
})
var services = require('./services/services');
var calendarServices = require('./calendar/calendar_services');

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack!');
  }
  else {
  console.log("Connected... Let's the darkness consumes you...");
  }
});

//Artorias is listening to "Poop"
controller.hears(["Poop", "^.poop.$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  console.log("You dirty bastard...");
  bot.reply(message,'NOPE, DON\'T YOU DARE!');
});

//Artorias is listening to "bookaroom"
controller.hears(["/bookaroom", "^./bookaroom.$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  console.log("Let's the adventure begins...");
    // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

    convo.ask('Do you want me to search a room for you, sire? (y/N)',function(response,convo) {
      
      var yesFormat = /^y|yes|YES|Y.*$/;
      var noFormat = /^n|no|NO|N.*$/;
      
      console.log(yesFormat.test(response.text));
      if (yesFormat.test(response.text)) {
        
        convo.say('Let\'s me check you for...');
        calendarServices.addEventToCalendar(calendarServices.setEvent());
      }
      else if (noFormat.test(response.text)) {
        convo.say('Ok then...');
      }
      else{
        convo.say('I didn\'t quite understand you, sire.');
        convo.repeat();
      }
      
      
      convo.next();

    });

  })
  
});