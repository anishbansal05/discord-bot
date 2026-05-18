const taskCommand =
  require('../commands/task.command');

const listCommand =
  require('../commands/list.command');

const deleteCommand =
  require('../commands/delete.command');

const remindCommand =
  require('../commands/reminder.command');

const doneCommand =
  require('../commands/done.command');

const commands = {

  '!task':
    taskCommand,

  '!list':
    listCommand,

  '!delete':
    deleteCommand,

  '!reminder':
    remindCommand,

  '!done':
    doneCommand
};

async function handleCommand(
  message
) {

  if (
    message.author.bot
  ) {
    return;
  }

  const parts =
    message.content
      .trim()
      .split(' ');

  const command =
    parts[0];

  const args =
    parts.slice(1);

  const handler =
    commands[command];

  if (!handler) {
    return;
  }

  try {

    await handler(
      message,
      args
    );

  } catch (err) {

    console.error(err);

    await message.reply(
      'Command failed'
    );
  }
}

module.exports =
  handleCommand;