const mongoose = require('mongoose');

const ReminderSchema =
  new mongoose.Schema({

    guildId: String,

    channelId: String,

    creatorId: String,

    message: String,

    remindAt: Date,

    sent: {
      type: Boolean,
      default: false
    }

  }, {
    timestamps: true
  });

module.exports =
  mongoose.model(
    'Reminder',
    ReminderSchema
  );