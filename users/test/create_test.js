// Make a test that shows we can create a new user and save it to the db

// import User file we want to test. That file is the what creates a new user and puts it in mongo. It's the User model or User model class that we use to create a new instance of user that has the entire colklection in our data base @ const User = mongoose.model('user', UserSchema);
const User = require('../src/user')
// import assertion capability of mocha, it's a function used in the it() block
const assert = require('assert');

// const { describe } = require("yargs");  // this came up automatically. Do NOT use

// describe() takes 2 arguments, the first is just a string that desrcibes the test we're about to write, the 2nd is a function that takes a bunch of it blocks
describe('Creating records', () => {
    // it() function takes same arugments as describe()
    it('saves a user', (done) => {
        // joe becomes an instance of the User model with "new". 
        // New istance of User
        const joe = new User({ name: 'Joe' });

        // save instance of the model to our db
        // joe is not just an object. because it calls new User it returns an object with a bunch of funtionality. save() is one. asynchronous by nature, save() has a built-in promise implementation
        joe.save()
        .then(() => {
            // Has joe been saved successfuly?
            assert(!joe.isNew);
            done();
        });
         
    });
});