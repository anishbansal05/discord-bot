require('dotenv').config();

const connectDB =
  require('./config/db');

const startServer =
  require('./api/app');

const startBot =
  require('./bot/bot');

async function bootstrap() {

  try {

    await connectDB();

    startServer();

    startBot();

    console.log(
      'Application started'
    );

  } catch (err) {

    console.error(err);
  }
}

bootstrap();