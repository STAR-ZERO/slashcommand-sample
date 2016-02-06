var Botkit = require('botkit');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
  debug: false,
});

var bot = controller.spawn({
  token: process.env.token
}).startRTM();

// https://github.com/howdyai/botkit/issues/108
bot.api.team.info({}, function(err, res) {
  controller.storage.teams.save({
    id: res.team.id
  }, function(err) {
  });
});

controller.setupWebserver(process.env.port, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);
});

controller.on('slash_command', function(bot, message) {
  if ('/hello' === message.command) {
    bot.replyPublic(message, 'Hello!');

    // bot.replyPrivate(message, 'Hello!');

    // message.text = 'Hello!';
    // message.attachments = [{
    //   text: 'Attachement text',
    //   image_url: 'https://octodex.github.com/images/original.png'
    // }];
    // bot.replyPublic(message, message);
  }
});
