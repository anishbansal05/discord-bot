const Task = require('../../models/task.model');

  async function create(data) {
    return await Task.create({
      title: data.title,
      discordId: data.discordId,
      remindAt: new Date()
    });
  }

module.exports = {
  create
};