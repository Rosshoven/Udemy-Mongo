// Creating actual model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    // About to reference another model again.
    // not assigning an array, only an obeject. A configuration object
    // Got to user collection
    user: { type: Schema.Types.ObjectId, 
            ref: 'user' }

});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

