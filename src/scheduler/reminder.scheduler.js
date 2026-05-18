const cron = require('node-cron');

const Task = require('../models/task.model');

const Reminder =
  require('../models/reminder.model');

const client =
  require('../bot/discordClient');


function startReminderScheduler() {

  cron.schedule('* * * * *', async () => {

    console.log('Checking reminders');

    const tasks = await Task.find({
      sent: false,
      remindAt: {
        $lte: new Date()
      }
    });
    const reminders = await Reminder.find({

        sent: false,

        remindAt: {
          $lte: new Date()
        }

    });

    // console.log(reminders,"reminder is this")

    for (const reminder of reminders) {

      try {

       const channel =
          await client.channels.fetch(
            reminder.channelId
          ); 

        await channel.send(

          `@everyone 🔔 ${reminder.message}`

        );

        reminder.sent = true;

        await reminder.save();

      } catch (err) {

        console.error(err);
      }
    }

    console.log(tasks);

  });
}

module.exports = startReminderScheduler;