const client =
  require('./discordClient');

const handleCommand =
  require('./handlers/commandHandler');

function startBot() {

  client.once(
    'clientReady',
    () => {

      console.log(
        `Logged in as ${client.user.tag}`
      );
    }
  );

  client.on(
    'messageCreate',
    async (message) => {

      await handleCommand(
        message
      );
    }
  );

  client.login(
    process.env.DISCORD_TOKEN
  );
}

module.exports =
  startBot;