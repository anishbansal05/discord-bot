const axios = require('axios');
const chrono = require('chrono-node');

async function handleTaskCommand(message) {

  if (!message.content.startsWith('!task ')) {
    return;
  }

  // Example:
  // !task Drink Water

  const title = message.content.slice(6).trim();

  await axios.post('http://localhost:3000/tasks', {
    title,
    discordId: message.author.id
  });

  message.reply('Task added');
}
async function handleTasksCommand(message) {
  if (message.content !== '!list') {
    return;
  }

  try {
    const response =
      await axios.get(
        `http://localhost:3000/tasks/${message.author.id}`
      );

    const tasks =
      response.data;

    if (!tasks.length) {
      return message.reply(
        'No tasks found'
      );
    }

    let output ='📋 Your Tasks\n\n';

    tasks.forEach(
      (task, index) => {

        output +=
          `${index + 1}. ${task.title}\n`;
      }
    );

    await message.reply(
      output
    );

  } catch (err) {

    console.error(err);

    await message.reply(
      'Failed to fetch tasks'
    );
  }
}
async function handleReminderCommand(message) {
  if (!message.content.startsWith('!remind ')) {
    return;
  }
  const raw = message.content.replace('!remind','').trim();

    const parsedDate =chrono.parseDate(raw);
    if (!parsedDate) {return message.reply('Could not parse time');}

    const dateText = chrono.parse(raw)[0]?.text;
    const reminderMessage = raw.replace(dateText, '').trim();

    await axios.post('http://localhost:3000/tasks', {
      guildId: message.guild.id,
      channelId: message.channel.id,
      creatorId: message.author.id,
      message:reminderMessage,
      remindAt:parsedDate
    });

  await message.reply(`Reminder set for ${parsedDate}`);
}

module.exports = { handleTaskCommand, handleTasksCommand, handleReminderCommand };