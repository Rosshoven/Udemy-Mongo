const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user_schema');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Associations', () => {
    
    // rememeber scope for your variables, put outside so it's more gloabl
    // lower case because it is an instance of that models. Model are above in Upper case, lines 2,3,4
    let joe, blogPost, comment;


    beforeEach((done) => {
        joe = new User({ name:'Joe' });
        blogPost = new BlogPost({title: 'JS is greatS', content: 'No, Like, For Real For Real'});
        comment = new Comment({content: 'OH BOY Congrats on the POAST'});

        // Have to get these to assiociate with each other. Remember you have blogPost in User Schema
        // we're pushing in an etntire model
        // the array from the models makes it possible to push
        // NOTE: when I comment out the below 3 lines, the collections 'comments' and 'users' comes back
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        // joe.save();
        // blogPost.save();
        // comment.save();
        // Use Promise.all because you have 3 promises above with .save(). Promise all takes an array of promises and puts into single Promise
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    }); 

    // if I want to run only a sngle test by itslef (we have 21 already), use  it.only
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is greatS')
                console.log(user);
                done();
         });
    });

    it('saves a full relation tree', (done) => {
        User.findOne({name: 'Joe'})
         .populate({ 
            // path option says inside user we fetch we want to load this additional resource as well
            path: 'blogPosts',
            populate: {
                path: 'comments',
                // when we load up the comments, we want to use the comment model. which model do we use?
                model: 'comment',
                populate: {
                        path: 'user',
                        model: 'user'
                    }
            }
         })
         .then((user) => {
            // console.log(user);
            // console.log(user.blogPosts[0].comments[0].content);

            const { name, blogPosts } = user;
            const { comments, title } = blogPosts[0];
            const { content, user: {} } = comments[0];
            assert(name === 'Joe');
            assert(title === 'JS is greatS');
            assert(content === 'OH BOY Congrats on the POAST');
            assert(user.name === 'Joe');

            console.log(name, blogPosts, comments, title, content);

            // before destructuring
            // assert(user.name === 'Joe');
            // assert(user.blogPosts[0].title === 'JS is greatS');
            // assert(user.blogPosts[0].comments[0].content === 'OH BOY Congrats on the POAST');
            // assert(user.blogPosts[0].comments[0].user.name === 'Joe');

            done();
         })
    });
});