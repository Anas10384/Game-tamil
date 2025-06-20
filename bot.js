const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'Akarshan_bot_noob', // your bot's username
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has spawned!');

    // Send a chat message every 5 minutes
    setInterval(() => {
      bot.chat("Hello! I'm Akarshan_bot_noob and I'm still online 😎");
    }, 5 * 60 * 1000); // 5 minutes

    // Random movement
    setInterval(() => {
      const moveDuration = 1000 + Math.random() * 1000;
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), moveDuration);
    }, 10000); // every 10 sec
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected, retrying in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err.message);
  });
}

createBot();
