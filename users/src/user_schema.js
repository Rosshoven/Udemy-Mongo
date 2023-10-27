// User model - User Schema

// Import statements. always gonna need to import mongoose. Mongoose is kind of like a wrapper around the Mongo db
const mongoose = require('mongoose');
// this creates an object
const Schema  = mongoose.Schema;

// importing the post schema...cant use import statments outside of module
const PostSchema = require('./post_schema');
const BlogPost = require('./blogPost');


// create what the Schema is
const UserSchema = new Schema({
    // I expect every user in my application to have a name property and i expect it to be a string: name: String, 
    // name with validating the name...// Add true for name must be written, error message in plain english
    name: {
        type: String,
        validate: {
          validator: (name) => name.length > 2,
          message: 'Name must be longer than 2 characters'
        },
        // name must be entered, it's requiredThis 
        required: [true, 'Name is required.']
        
    },
    // postCount: Number,  // making this into a virtual type
    // the array [] lets  mongoose know it will be a list of records 
    // this is a subdocument because it's taking in another schema
    posts: [PostSchema], 
    // adding new property
    likes: Number, 
    // grabbing the blogPost collection
    blogPosts: [{
        type: Schema.Types.ObjectId, 
        ref: 'blogPost'
    }]
});

// Adding a virtual field OUTSIDE of the UserSchema. function is being named postCount. we use function() declaration so we can use 'this'
// Look at my userSchema and add a virtual field of 'postCount'
UserSchema.virtual('postCount').get(function() {
    // if you want to access any properties of a particular user, you can reference this; this refers to the instance of the model we're working on. 
    console.log('hey hey sssmnsn');
    return this.posts.length;
});


// Watch for the remove event and ".pre" or before, run some function 2nd argument. function declation so we can use this. 
// next function is to keep moving forward because this is prob gonna be asynchornous
// specify it's document middleware with { document: true }
UserSchema.pre('deleteOne', { document: true }, function(next) {
    // using Blogpost means you need to import Blogpost, but if Blogpost has its own middleware it creates cyclical nature bwteen the files
    // to avoid that, we use mongoose right here to pull the blogPost model.
    const BlogPost = mongoose.model('blogPost');
    // this === joe
    BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
     .then(() => next())
});

// Mongoose says "hey mongo, do you have a collection called User? No?, ok then i'm gonna make it." first argument 'user' is what the collection is called on the mongo side of things.
// We don't have to go into Mongo and manually create this collection of users...mongoose does it for us automatically.
// 2nd argument Schema, anytime we have a user, we expect them to have a name and expect that name to be a string
// Created the model here
const User = mongoose.model('user', UserSchema);
// User class or User model defined here does not rep any particular user. It reps the entire collection


// export the model so another file can get reference to the user model.
module.exports = User;