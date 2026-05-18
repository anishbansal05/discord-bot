const Reminder = require('../../models/reminder.model');

  async function create(data) {
    return await Reminder.create({
      message: data.message,
      remindAt: data.remindAt,
      creatorId: data.creatorId,
      guildId : data.guildId,     
      channelId: data.channelId,
    });
  }

module.exports = {
  create
};          