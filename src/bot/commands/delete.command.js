const axios = require('axios');


async function handleDeleteTaskCommand(message,args) {
  console.log('deleteemessage',message.content)
   if (
    !message.content.startsWith(
      '!delete '
    )
  ) {
    return;
  }

   const title =
    args.join(' ');

  try {

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

module.exports = handleDeleteTaskCommand;