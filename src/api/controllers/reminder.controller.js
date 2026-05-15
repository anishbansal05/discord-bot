const Reminder =
  require('../../models/reminder.model');


  async function createReminder(req, res) {
      try {
    
        console.log(
          'Received request:',
          req.body
        );
    
        const {
          message,
          remindAt,
          discordId
        } = req.body;
    
        if (!message || !remindAt || !discordId) {
    
          return res.status(400).json({
            error:
              'Missing required fields'
          });
        }
    
        const reminder =
          await Reminder.create({
            message,
            remindAt,
            discordId
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