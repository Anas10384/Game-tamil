const mineflayer = require('mineflayer');
const express = require('express');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;

// Setup Express server to prevent Render timeout
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('✅ Bot is alive'));
app.listen(port, () => console.log(`🌐 Express running on port ${port}`));

// Create bot function
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Anasvirat.aternos.me',
    port: 59769,
    username: 'Jinesh',
    auth: 'offline'
  });

  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log('🌍 Bot spawned');

    // Load movement data
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    defaultMove.allowParkour = true;
    defaultMove.canDig = true;
    defaultMove.scafoldingBlocks = [];
    bot.pathfinder.setMovements(defaultMove);

    // Random movement every 15s
    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() * 20 - 10);
      const y = bot.entity.position.y;
      const z = bot.entity.position.z + (Math.random() * 20 - 10);
      bot.pathfinder.setGoal(new GoalNear(x, y, z, 0));
    }, 15000);

    // Anti-AFK jumping every 8s
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 8000);

    // Chat every 3 minutes
    setInterval(() => {
      bot.chat('hi bros');
    }, 3 * 60 * 1000);

    // Sleep at night if bed found
    setInterval(() => {
      if (bot.time.isNight && !bot.isSleeping) {
        const bed = bot.findBlock({
          matching: block => bot.isABed(block),
          maxDistance: 10
        });

        if (bed) {
          bot.sleep(bed)
            .then(() => {
              console.log('😴 Bot is sleeping');
            })
            .catch(err => {
              console.log('⚠️ Sleep failed:', err.message);
            });
        }
      }

      // Wake up in morning
      if (!bot.time.isNight && bot.isSleeping) {
        bot.wake()
          .then(() => console.log('☀️ Bot woke up'))
          .catch(() => {}); // already awake
      }
    }, 5000);
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in');
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
    console.error('❗ Error:', err.message);
  });
}

createBot();
