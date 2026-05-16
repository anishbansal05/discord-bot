const express = require('express');

const router = express.Router();

const {
  createTask,
  showTask,
  getTasksByDiscordId,
  taskDone,
  taskDelete
} = require(
  '../controllers/task.controller'
);
router.post('/',createTask);

router.get('/',showTask);

router.patch(
  '/done',
  taskDone
);

router.get(
  '/:discordId',
  getTasksByDiscordId
);
router.delete('/',taskDelete);

module.exports = router;