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

  // Optional: walk/jump to avoid AFK kicks
  setInterval(() => {
    if (bot.entity && bot.entity.position) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000); // every 30 seconds
}

createBot();
