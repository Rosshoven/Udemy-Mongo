const assert = require('assert');

// the actual file that is in the app
const User = require("../src/user");

describe('Reading users out of the DB', () => {
     
    // joe variable 
    let joe;
    // make sure you have a "Joe" put into the DB before running this test
    beforeEach((done) => {
        // no variable let or const because that limits its scope to this function. to make joe variable available to it(), we declare outside of beforeForEach
        joe = new User({ name: 'Joe' });
        joe.save()
          .then(() => done());
    });

    it('Finds all users with a name of Joe', (done) => {
        // asynchronous because it's going to Mondodb. find() method locates all users matching the criteria. 
        User.find({name: "Joe" })
            // Promise from above line needs a .then() for what to do after the Promise. 
          .then(users => {
            // toString() needed when comparing a mongodb _id with another _id, The Big Gotcha
            assert(users[0]._id.toString() === joe._id.toString());
            console.log(users);
            // must close it out. 
            done();
          });
    });

    it('find a user with a particular id', (done) => {
      // look up with a particular id
      User.findOne({ _id: joe._id})
      .then( user => {
        assert(user.name === 'Joe');
        done();
      })
    })

});
