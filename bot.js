const mineflayer = require('mineflayer');
const express = require('express');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;

// Express keepalive server
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('✅ Bot is alive'));
app.listen(port, () => console.log(`🌐 Express server running on port ${port}`));

// Create the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'Jinesh',
    auth: 'offline'
  });

  bot.once('spawn', () => {
    console.log('🌍 Bot spawned');

    // Load pathfinder and set default movement
    bot.loadPlugin(pathfinder);
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);

    // Move to a random position every 15 seconds
    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() * 20 - 10);
      const y = bot.entity.position.y;
      const z = bot.entity.position.z + (Math.random() * 20 - 10);
      bot.pathfinder.setGoal(new GoalNear(x, y, z, 1));
    }, 15000);
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in');
    
    // Chat every 3 minutes
    setInterval(() => {
      bot.chat('hi bros');
    }, 3 * 60 * 1000); // 3 minutes
  });

  bot.on('death', () => {
    console.log('💀 Bot died. Respawning...');
    setTimeout(() => bot.respawn(), 3000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❗ Error:', err.message);
  });
}

createBot();
