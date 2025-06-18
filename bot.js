const mineflayer = require('mineflayer');
const express = require('express');

// Create Express server for keep-alive
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('✅ Bot is alive'));
app.listen(port, () => console.log(`🌐 Express running on port ${port}`));

// Function to create and manage bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769, // ⚠️ Aternos may change this
    username: 'Raja',
    auth: 'offline' // cracked account
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in');

    // Chat + anti-AFK movement every 10s
    setInterval(() => {
      bot.chat('hi bros');
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500); // quick jump
    }, 10000);
  });

  bot.on('spawn', () => {
    console.log('🌍 Bot spawned into the world');
  });

  bot.on('death', () => {
    console.log('💀 Bot died. Respawning...');
    setTimeout(() => bot.respawn(), 3000);
  });

  bot.on('end', () => {
    console.log('🔁 Disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❗ Bot error:', err.message);
  });
}

createBot();
