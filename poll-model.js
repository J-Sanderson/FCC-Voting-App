const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: String,
  creator: String,
  options: Array, //item and vote?
  voted: Array //users who have voted
});

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;