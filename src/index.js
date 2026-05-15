require('dotenv').config();

const connectDB = require('./config/db');

const startServer = require('./api/app');
const startBot = require('./bot/bot');

const startReminderScheduler = require('./scheduler/reminder.scheduler');

async function bootstrap() {
  try {

    // 1. DB Connection
    await connectDB();

    // 2. Express Server
    startServer();

    // 3. Discord Bot
    startBot();

    // 4. Scheduler
    startReminderScheduler();

    console.log('Application started');

  } catch (err) {
    console.error(err);
  }
}

bootstrap();