const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: String,
  creator: String//and some more stuff...
});

const Poll = mongoose.model("poll", pollSchema);

module.exports = Poll;