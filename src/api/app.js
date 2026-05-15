const express = require('express');

const taskRoutes = require('./routes/task.routes');
const reminderRoutes = require('./routes/reminder.routes')

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
    console.log(req);
    console.log(`[APP MIDDLEWARE] ${req.method} ${req.path}`);
    next();
  });

  app.use('/tasks', taskRoutes);
  app.use('/reminders', reminderRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });

  return app;
}

module.exports = startServer;