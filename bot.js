const mineflayer = require('mineflayer');
const status = require('./status');

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
    status.setStatus('✅ Aternos Bot is Online');
  });

  bot.on('spawn', () => {
    console.log('🌍 Bot spawned');
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5 seconds...');
    status.setStatus('❌ Aternos Bot Disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Error:', err);
    status.setStatus(`❌ Error: ${err.message}`);
  });

  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000);

  setInterval(() => {
    if (bot.chat) {
      bot.chat('hi bro');
    }
  }, 2 * 60 * 1000);
}

createBot();
