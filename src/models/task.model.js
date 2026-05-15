const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

  title: String,

  discordId: String,

  remindAt: Date,

  sent: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports =
  mongoose.model('Task', TaskSchema);