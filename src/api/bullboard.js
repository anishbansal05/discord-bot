const {
  createBullBoard
} = require('@bull-board/api');

const {
  BullMQAdapter
} = require('@bull-board/api/bullMQAdapter');

const {
  ExpressAdapter
} = require('@bull-board/express');

const reminderQueue =
  require('../queues/reminder.queue');

const serverAdapter =
  new ExpressAdapter();

serverAdapter.setBasePath(
  '/admin/queues'
);

createBullBoard({

  queues: [

    new BullMQAdapter(
      reminderQueue
    )

  ],

  serverAdapter

});

module.exports =
  serverAdapter;