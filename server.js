const express = require('express');
const status = require('./status');
require('./bot'); // Start the bot

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<h1>${status.getStatus()}</h1>`);
});

app.listen(port, () => {
  console.log(`🌐 Status server running on port ${port}`);
});
