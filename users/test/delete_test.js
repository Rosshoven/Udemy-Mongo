// Boiler plate for test
const assert = require('assert');
// Get user model, user class. the actual file that is in the app
const User = require("../src/user_schema");



describe('Deleting a user', () => {

    let joe;

    // save a joe before running test
  beforeEach((done) => {
    //  make and save and return promise to finish with done()
    joe = new User({ name: 'Joe'})
    joe.save()
    .then(() => done());
  });

    //uses the instance of the model 
  it('model instance remove', (done) => {
    // get rid of joe - returns a 1st promise because it's messing with mongodb
    joe.deleteOne()
        // nesting another promise here, or chaining a promise onthen go back and try to find an instance of joe, another promise here
      .then(() => User.findOne({name: 'Joe'})
        // then assert that the user-you-found's value us null, user isn't there. Need the { } because more than one thing is being followed.
      .then((user) => {
        assert(user === null);
        // must complete the promises
        done();
      }));
  });

  // Use a class method delete when you want to remove a bunch of records
  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteMany({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'})
        .then(user => {
            assert(user === null);
            done();
        }))
  });

  it('class method findOneAndRemove', (done) => {
    // doing a class method so we'll refer to User model
    User.findOneAndRemove({ name: 'Joe'})
        .then(() => User.findOne({name: 'Joe'}))
          .then(user => { assert(user === null);
        done();
  });
});

  it('class method findByIdAndRemove', (done) => {
    // Mongoose takes care of passing id's for us. object not needed. just the raw id.
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: null}))
        .then(user => {
            assert(user === null);
            done();
      });
    });

// Have to close whole describe test.
});