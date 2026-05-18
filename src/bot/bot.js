const client =
  require('./discordClient');

const { handleTaskCommand, handleTasksCommand, handleDeleteTaskCommand } =require('./commands/task.command');
const  handleReminderCommand  = require('./commands/reminder.command');
const markTaskDoneCommand = require('./commands/done.command');

function startBot() {

  client.once(
    'clientReady',
    () => {

      console.log(
        `Logged in as ${client.user.tag}`
      );

      client.user.setPresence({

        status: 'online',

        activities: [
          {
             name: '!task | !reminder | !list | !done | !delete',
          }
        ]

      });
    }
  );

  client.on(
    'messageCreate',
    async (message) => {

      if (message.author.bot) {
        return;
      }

      await handleTaskCommand(
        message
      );

      await handleReminderCommand(
        message
      );
      await handleTasksCommand(
        message
      );
      await markTaskDoneCommand(
        message
      );

      await handleDeleteTaskCommand(
        message
      );
    }
  );

  client.login(
    process.env.DISCORD_TOKEN
  );
}

module.exports = startBot;