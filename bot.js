const mineflayer = require('mineflayer');
const express = require('express');

// Create express app for keepalive
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('✅ Aternos Bot is alive'));
app.listen(port, () => console.log(`🌐 Web server running on port ${port}`));

// Create the Minecraft bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'raja',
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log('✅ Bot connected');
    setInterval(() => {
      bot.chat('hi bros');
    }, 10000);
  });

  bot.on('death', () => {
    console.log('💀 Bot died. Respawning...');
    setTimeout(() => bot.respawn(), 3000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❗ Bot error:', err.message);
  });
}

createBot();
