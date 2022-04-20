const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  vote: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: 'Issue',
    required: true,
  },
});

module.exports = mongoose.model('Vote', VoteSchema);
