// Creating actual model
const mongoose = require('mongoose');
// This makes use of mongoose schema "grab the schema property off of it"
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        // this is a reference to another model, ref to another collection - it's not a subdocument
        type: Schema.Types.ObjectId, 
        // this is like 'user' on line 46 in user_schema.js
        ref: 'comment'
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;