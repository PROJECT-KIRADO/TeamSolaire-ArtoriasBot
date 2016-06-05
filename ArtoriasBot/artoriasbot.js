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
        
        var capacity;
        var type;
        var needProjector;
        
        askCapacity = function (response, convo) {
          convo.ask('How many are you?', function(response, convo) {
            askRoomType(response, convo);
            capacity = response.text;
            convo.next();
          });
        }
        askRoomType = function (response, convo) {
          convo.ask('What kind of room you want to book?', function(response, convo) {
            askHaveProjector(response, convo);
            type = response.text;
            convo.next();
          });
        }
        askHaveProjector = function (response, convo) {
          convo.ask('Did you need a projector?', function(response, convo) {
            if (yesFormat.test(response.text)) {
              needProjector = 'Yes';
            }
            else {
              needProjector = 'No';
            }
            
            askConfirmation(response, convo);
            convo.next();
          });
        }
        askConfirmation = function (response, convo) {
          convo.say('Capacity: ' + capacity + '\nRoom Type: ' + type + "\nNeed Projector: " + needProjector);
          convo.ask('Is this exactly what you want? (y/N)', function(response,convo) {
            
            convo.next();
          });          
        }

        bot.startConversation(message, askCapacity);

        convo.say('Alright, let\'s me check for you...');
        //calendarServices.addEventToCalendar(calendarServices.setEvent());
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