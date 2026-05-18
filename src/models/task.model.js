const mongoose = require('mongoose');

const TaskSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    discordId: {
      type: String,
      required: true
    },

    remindAt: Date,

    status: {

      type: String,

      enum: [
        'pending',
        'completed',
        'deleted'
      ],

      default: 'pending'
    },

    sent: {

      type: Boolean,

      default: false
    }

  }, {
    timestamps: true
  });

module.exports =
  mongoose.model('Task', TaskSchema);