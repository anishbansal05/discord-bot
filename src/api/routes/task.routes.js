const express = require('express');

const router = express.Router();

const {
  createTask,
  showTask,
  getTasksByDiscordId
} = require(
  '../controllers/task.controller'
);
router.post('/',createTask);

router.get('/',showTask);

router.get(
  '/:discordId',
  getTasksByDiscordId
);

module.exports = router;