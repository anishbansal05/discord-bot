require('dotenv').config();

const connectDB =
  require('./config/db');

async function startWorker() {

  await connectDB();

  require(
    './workers/reminder.worker'
  );

  console.log(
    'Worker started'
  );
}

startWorker();