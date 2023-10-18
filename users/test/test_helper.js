//writing any code we have to set up our testing environment
// initial set-up for our tests

// require is how we do sharing between different files in a node environment
// we assign the mongoose library to the variable mongoose
const mongoose = require('mongoose');

// when mongoose makess a promise, we want you to use the es6 implmenetation (global.Promise). es6 is now the default promise implementation
// mongoose.Promise = global.Promise;   //TEMP HOLD


before((done) => {

    // All the connection logic

    // mongoose connect function. what server of mongo youre trying to connect to is. it's running locally so we have localhost. users_test will be a database of collections. we don't need to create it ahead of time.
    mongoose.connect('mongodb://localhost/users_test');


    mongoose.connection
        // in order to get a message back to us only when the connection has succedeed or failed, we use this 'once' and 'on' event handlers.
        // once means watch for mongoose to have an event named "open" 1 time, once it does, run this function. 
        // 'open' and 'error' are specific events from the docs, not just made up. done() tells mongoose to inform mocha we're ready to move on
        .once('open', () => { done(); })
        // run on if there's an error. 
        .on('error', (error) => {
            // warn has string first, then the error the function was called with
            console.warn('Warning', error);
        });
});


    // this is a hook that will run before each test. it has a done callback
    beforeEach((done) => {
        // direct refernece to our collection of users sitting inside our database.
        // .drop() takes all the records inside of the db and toss them out the window. clear em out.
        mongoose.connection.collections.users.drop(() => {
            // what to do once db is cleared...Ready to run the next test
            
            // a connection to a db is asynchronous by nature, so you need to tell mocha to wait
            // done() is a signal to mocha that you can run the next test
            done();

        });
        // Any type of operation on our DB is acynchronous by nature. It takes some amount of time to complete. Mocha on the other hand, doesn't have any default idea of ascynchronous operations.

    });


    