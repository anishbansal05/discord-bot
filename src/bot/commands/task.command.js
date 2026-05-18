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
          `${task.completed ? '✅' : '❌'}. ${index + 1}. ${task.title}\n`;
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

async function handleDeleteTaskCommand(message) {
  console.log('deleteemessage',message.content)
   if (
    !message.content.startsWith(
      '!delete '
    )
  ) {
    return;
  }

  try {
    const title =
    message.content
      .slice(8)
      .trim();

    const response =
      await axios.delete(
        'http://localhost:3000/tasks/',
        {
          data: {
            title,
            discordId:message.author.id
          }
        }
      );
    await message.reply(
      `Deleted: ${response.data.title}`
    );

  } catch (err) {

    console.error(err);

    await message.reply(
      'Failed to fetch tasks'
    );
  }
}

module.exports = { handleTaskCommand, handleTasksCommand , handleDeleteTaskCommand};