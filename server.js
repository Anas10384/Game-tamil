const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'Akarshan_bot_noob',
    version: '1.20.1' // Make sure your Aternos server is set to this version
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has spawned in the server.');

    // Send a message every 5 minutes
    setInterval(() => {
      bot.chat("Hello! I'm Akarshan_bot_noob and I'm still online 😎");
    }, 5 * 60 * 1000); // every 5 minutes

    // Move forward randomly every 10 seconds
    setInterval(() => {
      const duration = 1000 + Math.random() * 1000; // move 1-2 seconds
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
      }, duration);
    }, 10000); // every 10 seconds
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected, retrying in 5 seconds...');
    setTimeout(createBot, 5000);
  });
}

createBot();
