const assert = require('assert');

// the actual file that is in the app
const User = require("../src/user_schema");

describe('Reading users out of the DB', () => {
     
    // joe variable 
    let joe, maria, alex, zach;    
    // make sure you have a "Joe" put into the DB before running this test
    beforeEach((done) => {
        // no variable let or const because that limits its scope to this function. to make joe, maria, alex, zach variable available to it(), we declare outside of beforeForEach
      //  this creates the record on the server side, node.js program until you save()
        alex = new User({name: 'Alex'});
        joe = new User({ name: 'Joe' });
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});

        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
        .then(() => done());
    });

    it('finds all users with a name of Joe', (done) => {
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
      });
    });

    it('can skip and limit the result set', (done) => {
      // with empty object {}, saying give me every record in the DB
      // result is: -Alex- [Joe Maria] -Zach-
      User.find({})
      // sort by assecnding fashion, -1 would be descending
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
      })
      done();
    });
});
