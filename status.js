let status = 'Aternos Bot is Starting...';

module.exports = {
  getStatus: () => status,
  setStatus: (newStatus) => {
    status = newStatus;
  }
};
