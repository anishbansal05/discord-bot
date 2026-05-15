const Reminder = require('../../models/reminder.model');

  async function create(data) {
    return await Reminder.create({
      message: data.message,
      remindAt: data.remindAt,
      discordId: data.discordId
    });
  }

module.exports = {
  create
};          