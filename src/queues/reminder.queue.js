const {
  Queue
} = require('bullmq');

const Redis =
  require('ioredis');

const connection =
  new Redis({

    maxRetriesPerRequest: null

  });

const reminderQueue =
  new Queue(

    'reminders',

    {
      connection
    }

  );

module.exports =
  reminderQueue;