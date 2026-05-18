const axios = require('axios');
const chrono = require('chrono-node');

async function handleTaskCommand(message,args) {
  if (!message.content.startsWith('!task ')) {
    return;
  }

  const title =
    args.join(' ');

    if(!title){
       return message.reply(
      'Provide task title'
    );
  }

  await axios.post('http://localhost:3000/tasks', {
    title,
    discordId: message.author.id
  });

  message.reply('Task added');
}




module.exports = handleTaskCommand ;