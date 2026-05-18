const express = require('express');

const taskRoutes = require('./routes/task.routes');
const reminderRoutes = require('./routes/reminder.routes');
const googleRoutes = require('./routes/google.routes');

const bullBoard = require('./bullboard');

let app = null;

function startServer() {
  if (app) {
    console.log('Server already started, returning existing instance');
    return app;
  }

  app = express();

  app.use(express.json());
  

  // Add logging middleware
  app.use((req, res, next) => {
    console.log(`[APP MIDDLEWARE] ${req.method} ${req.path}`);
    next();
  });

  app.use('/tasks', taskRoutes);
  app.use('/reminder', reminderRoutes);

  app.use(
    '/admin/queues',
    bullBoard.getRouter()
  );

  app.use(
    '/auth',
    googleRoutes
  );

  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });

  return app;
}

module.exports = startServer;