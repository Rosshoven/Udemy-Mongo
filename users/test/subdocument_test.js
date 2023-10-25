const assert = require('assert');
const User = require('../src/user_schema');

describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
        // we want to give a list (use [] for an array) of posts where each post has a title
        const joe = new User({
            name: 'Joe', 
            posts: [{title: 'Post Title'}]
        });
        joe.save()
          .then(() => User.findOne({name: 'Joe'}))
        //   user is return by this findOne query above
          .then((user) => {
            // inside the assertion, I expect to have a user who has a posts property which should be an array. Because it's an array I wan to pull out the first record of array [0], and i want to grab the title property which should be equal to "Post Title"
            assert(user.posts[0].title === 'Post Title');
            // close the promise
            done();
        });
    });

    // Adding subdocument - a post that will be embedded
    it('Can add subdocuments to an existing record', (done) => {
        // Create Joe
        const joe = new User({
            name: 'Joe',
            // Joe is starting off with an empty array of posts
            posts: []
        });
        // Save Joe
        joe.save()
        // Fetch Joe
          .then(() => User.findOne({name: 'Joe'}))
        // Add Post to user.  Again user is what's returned from findOne() 1 line above. 
        // Curly braces make it so the return is not automatic. Need to have a return coming. old school.
          .then((user) => {
            user.posts.push({title: 'NewNew Post'});
        // need to save - push does not save the post. 
        // have to add return statement because you're in { } which requires a return from the promise
        // the return makes it a promise and able to continue with .then()
          return user.save();
          })
        //   find Joe
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
            assert(user.posts[0].title === 'NewNew Post');

            done();
           })
        });

        // Remove post - remove subdocuments
        it('can remove an existing subdocument', (done) => {
            const joe = new User({
                name: 'Joe',
                posts: [{title:'NewNew Title'}]
            });

            joe.save()
              .then(() => User.findOne({name: 'Joe'}))
              .then((user) => {
            // define record then remove or pull record
                const post = user.posts[0];
                user.posts.pull(post);
            // have to manually call save on the user and its changes, save whole file
                return user.save();
              })
              .then(() => User.findOne({name: 'Joe'}))
              .then((user) => {
               assert(user.posts.length === 0);

            done();
           })
        });
   
}); 