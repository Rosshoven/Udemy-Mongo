// Creating actual model
const mongoose = require('mongoose');
// This makes use of mongoose schema "grab the schema property off of it"
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        // this is a reference to another model
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }]
});
