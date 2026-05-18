const {
  Worker
} = require('bullmq');

const connection =
  require('../config/redis');

const Reminder =
  require('../models/reminder.model');

const client =
  require('../bot/discordClient');

client.login(
  process.env.DISCORD_TOKEN
);

console.log(
  'WORKER FILE LOADED'
);

const worker =
  new Worker(

    'reminders',

    async (job) => {

      console.log(
        'JOB RECEIVED'
      );

      console.log(
        job.data
      );

      const reminder =
        await Reminder.findById(

          job.data.reminderId
        );

      if (!reminder) {

        console.log(
          'Reminder not found'
        );

        return;
      }

      const channel =
        await client.channels.fetch(

          reminder.channelId
        );

      await channel.send(

        `⏰ Reminder: ${reminder.message}`

      );

      console.log(
        'REMINDER SENT'
      );
    },

    {
      connection
    }

);

worker.on(
  'completed',
  (job) => {

    console.log(
      `Job completed ${job.id}`
    );
  }
);

worker.on(
  'failed',
  (job, err) => {

    console.error(
      'JOB FAILED',
      err
    );
  }
);