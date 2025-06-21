const mineflayer = require('mineflayer');

const options = {
  host: 'Anasvirat.aternos.me',
  port: 59769,
  username: 'Raja',
  version: '1.21.1'
};

let bot;

function createBot() {
  bot = mineflayer.createBot(options);

  bot.on('login', () => {
    console.log('✅ Bot logged in');
    bot.chat('Raja is online to keep the server active!');
  });

  bot.on('spawn', () => {
    console.log('🌍 Bot spawned');
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Error:', err);
  });

  // Jump every 30 seconds to stay AFK
  setInterval(() => {
    if (bot.entity && bot.entity.position) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000); // every 30 sec

  // Say "hi bro" every 2 minutes
  setInterval(() => {
    if (bot.chat) {
      bot.chat('hi bro');
    }
  }, 2 * 60 * 1000); // every 2 minutes
}

createBot();
