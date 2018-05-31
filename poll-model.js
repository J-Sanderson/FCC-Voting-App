const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: String,
  creator: String,
  options: String, //item and vote count
  voted: Array //users who have voted
});

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;