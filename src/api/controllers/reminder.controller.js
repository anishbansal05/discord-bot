const Reminder = require('../../models/reminder.model');
const ReminderService = require('../services/reminder.service');

  async function createReminder(req, res) {
      try {
    
        console.log(
          'Received request:',
          req.body
        );
    
        const {
          guildId,     
          channelId,
          creatorId,   
          message,
          remindAt
        } = req.body;
    
        if (!message || !remindAt) {
    
          return res.status(400).json({
            error:
              'Missing required fields'
          });
        }
    
        const reminder =
          await ReminderService.create({
            guildId,     
            channelId,
            creatorId,   
            message,
            remindAt
          });
    
        return res.json(reminder);
    
      } catch (err) {
    
        console.error(err);
    
        return res.status(500).json({
          error:
            'Internal server error'
        });
      }
  }
  
  module.exports = {
    createReminder
  };