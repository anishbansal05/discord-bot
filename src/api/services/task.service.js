const Task = require('../../models/task.model');

  async function create(data) {
    return await Task.create({
      title: data.title,
      discordId: data.discordId,
      remindAt: new Date()
    });
  }

  async function markDone(data) {

    return await Task.findOneAndUpdate(

    {
      discordId:
        data.discordId,

      title:
        data.title,

      status: 'pending'
    },
    {
      status: 'completed'
    },
    { returnDocument: 'after' } 

    );
  }

async function markDelete(data) {

  return await Task.findOneAndDelete(

    {

     discordId:
        data.discordId,

      title:
        data.title,

      status: 'pending'

  },
  {
      status: 'deleted'
  },
  { returnDocument: 'after' } 
);
}

module.exports = {
  create,markDone,markDelete
};