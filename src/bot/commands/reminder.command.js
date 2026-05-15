const axios = require('axios');
const chrono = require('chrono-node');

async function handleReminderCommand(
  message
) {

  if (
    !message.content.startsWith(
      '!remind '
    )
  ) {
    return;
  }

  const raw =
    message.content.replace(
      '!remind',
      ''
    ).trim();

  // parse date
  const parsedDate =
    chrono.parseDate(raw);

  if (!parsedDate) {

    return message.reply(
      'Could not parse time'
    );
  }

  // remove date text
  const dateText =
    chrono.parse(raw)[0]?.text;

  const reminderMessage =
    raw.replace(dateText, '').trim();

  const reminder =
    await Reminder.create({

      guildId:
        message.guild.id,

      channelId:
        message.channel.id,

      creatorId:
        message.author.id,

      message:
        reminderMessage,

      remindAt:
        parsedDate

    });

  console.log(
    'REMINDER CREATED',
    reminder
  );

  await message.reply(

    `Reminder set for ${parsedDate}`
  );
}

module.exports =
  handleReminderCommand;