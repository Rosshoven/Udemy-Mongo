// This is a schema file, you really should call it post_schema.js and perhaps put in a schemas directory
const mongoose = require('mongoose');
// This makes use of mongoose schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;


// We didn't create a mongoose.model because this is NOT going to map to a distinct collection of posts inside our mongo db.