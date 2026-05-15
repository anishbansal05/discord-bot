const client =
  require('./discordClient');

const { handleTaskCommand, handleTasksCommand, handleReminderCommand } =
  require('./commands/task.command');
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
             name: '!task | !remind | !list',
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
    }
  );

  client.login(
    process.env.DISCORD_TOKEN
  );
}

module.exports = startBot;