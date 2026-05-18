const Reminder = require('../../models/reminder.model');
const ReminderService = require('../services/reminder.service');
const {
  createCalendarEvent
} = require(
  '../services/calendar.service'
);

const reminderQueue = require(
    '../../queues/reminder.queue'
  );

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

          const endDate =
  new Date(

    new Date(remindAt)
      .getTime()

    + 30 * 60 * 1000
  );

const calendarEvent =

  await createCalendarEvent({

    summary:
      message,

    description:
      'Created from Discord bot',

    startDate:
      remindAt,

    endDate
  });

console.log(
  'CALENDAR EVENT CREATED',
  calendarEvent.id
);

          const delay = new Date(remindAt) - new Date();

          console.log({
            remindAt,
            delay
          });

          if (delay < 0) {

            return res.status(400).json({
              error:
                'Reminder time already passed'
            });
          }

          await reminderQueue.add(

            'sendReminder',

            {
              reminderId:
                reminder._id
            },

            {
              delay
            }

          );

          console.log(
            'JOB ADDED TO QUEUE'
          );
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