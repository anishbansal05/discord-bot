const {
  google
} = require('googleapis');

const {
  oauth2Client
} = require('./google.service');

async function createCalendarEvent({

  summary,

  description,

  startDate,

  endDate

}) {

  // const tokenStore =
  // require('../../config/googleTokens');

  const fs =
  require('fs');

const tokens = JSON.parse(

  fs.readFileSync(

    './src/config/googleTokens.json'

  )

);

  console.log(
  'TOKEN STORE',
  tokens
);


oauth2Client.setCredentials(
  // tokenStore.tokens
  tokens
);

  const calendar =
    google.calendar({

      version: 'v3',

      auth:
        oauth2Client
    });

  const response =
    await calendar.events.insert({

      calendarId: 'primary',

      requestBody: {

        summary,

        description,

        start: {

          dateTime:
            startDate,

          timeZone:
            'Asia/Kolkata'
        },

        end: {

          dateTime:
            endDate,

          timeZone:
            'Asia/Kolkata'
        }
      }
    });

  return response.data;
}

module.exports = {
  createCalendarEvent
};