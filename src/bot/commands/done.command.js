const axios = require('axios');

async function handleDoneCommand(
  message
) {

  if (
    !message.content.startsWith(
      '!done '
    )
  ) {
    return;
  }

  const title =
    message.content
      .slice(6)
      .trim();

  try {

    const response =
      await axios.patch(

        'http://localhost:3000/tasks/done',

        {
          discordId:
            message.author.id,

          title
        }

      );

    await message.reply(

      `✅ Completed: ${response.data.title}`

    );

  } catch (err) {

    console.error(err);

    await message.reply(
      'Task not found'
    );
  }
}

module.exports =
  handleDoneCommand;