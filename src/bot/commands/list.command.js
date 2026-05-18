const axios = require('axios');

async function handleListCommand(message) {
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
          `${task.status =='completed' ? '✅' : '❌'}. ${index + 1}. ${task.title}\n`;
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

module.exports = handleListCommand;