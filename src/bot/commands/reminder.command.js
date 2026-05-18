const axios = require('axios');

const chrono =
  require('chrono-node');

const {
  createCalendarEvent
} = require(
  '../../api/services/calendar.service'
);

async function handleReminderCommand(
  message
) {

  if (
    !message.content.startsWith(
      '!reminder '
    )
  ) {
    return;
  }

  const raw =
    message.content
      .replace(
        '!reminder',
        ''
      )
      .trim();

  const results =
    chrono.parse(

      raw,

      new Date(),

      {
        forwardDate: true
      }

    );

  const parsedDate =
    results[0]?.start.date();

  if (!parsedDate) {

    return message.reply(
      'Could not parse time'
    );
  }

  console.log(
    'PARSED DATE',
    parsedDate
  );

  console.log(

    parsedDate.toLocaleString(

      'en-IN',

      {
        timeZone:
          'Asia/Kolkata'
      }

    )

  );

  const endDate =
  new Date(

    parsedDate.getTime() +

    30 * 60 * 1000
  );

  const dateText =
    results[0]?.text;

  const reminderMessage =
    raw.replace(
      dateText,
      ''
    ).trim();

  await createCalendarEvent({

    summary:
      reminderMessage,

    description:
      `Created from Discord bot`,

    startDate:
      parsedDate,

    endDate

  });

  await axios.post(

    'http://localhost:3000/reminder',

    {

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
    }

  );

  // await message.reply(
  //   `Reminder set for ${parsedDate.toLocaleString('en-IN')}`
  // );
  await message.reply(
    `📅 Reminder + Calendar event created for
    ${parsedDate.toLocaleString('en-IN')}`
  );
}

module.exports =
  handleReminderCommand;