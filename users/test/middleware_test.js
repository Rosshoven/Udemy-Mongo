const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user_schema');
const BlogPost = require('../src/blogPost');
// const Comment = require('../src/comment');


describe('Middleware', () => {
    
    // initilize joe and blogpost
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name:'Joe' });
        blogPost = new BlogPost({title: 'JS is greatS', content: 'No, Like, For Real For Real'});

        // Have to associate these 2 above. Remember you have blogPost in User Schema
        joe.blogPosts.push(blogPost);

        // Use Promise.all because you have 3 promises above with .save(). Promise all takes an array of promises and puts into single Promise
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    }); 

    it('users clean up dangling blogposts on delete', (done) => {
        joe.deleteOne()
          .then(() => BlogPost.count())
          .then((count) => {
            assert(count === 0);
            done();
        });
    });
});