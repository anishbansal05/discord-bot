const TaskService =
  require('../services/task.service');

const Task =
  require('../../models/task.model');

async function createTask(req, res) {

  try {

    console.log(
      'Received request:',
      req.body
    );

    const {
      title,
      discordId
    } = req.body;

    if (!title || !discordId) {

      return res.status(400).json({
        error:
          'Missing required fields'
      });
    }

    const task =
      await TaskService.create({
        title,
        discordId
      });

    return res.json(task);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error:
        'Internal server error'
    });
  }
}

async function showTask(req, res) {
  try {
    const tasks =
      await Task.find({})
        .sort({
          createdAt: -1
        });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        'Internal server error'
    });
  }
}
async function getTasksByDiscordId(
  req,
  res
) {
  try {
    const tasks =
      await Task.find({
        discordId:
          req.params.discordId
      }).sort({
        createdAt: -1
      });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        'Internal server error'
    });
  }
}

module.exports = {
  createTask,
  showTask,
  getTasksByDiscordId
};