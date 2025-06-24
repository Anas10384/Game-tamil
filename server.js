const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Web server to keep Render app alive
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(port, () => console.log(`✅ Web server running on port ${port}`));

function startBot() {
  const bot = mineflayer.createBot({
    host: 'Amrad.aternos.me', // Replace with your Aternos IP
    port: 45112,
    username: 'RP', // Use offline name or real email if premium
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ Bot spawned and connected to the server');

    // Send a message every 5 minutes
    setInterval(() => {
      bot.chat('I am still online to keep the server awake!');
    }, 5 * 60 * 1000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot was disconnected. Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot error:', err);
  });
}

startBot();
