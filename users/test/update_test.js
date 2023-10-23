const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        // create a joe so you know one is in there to test
        joe = new User({ name: 'Joe', likes: 0 });
        // save joe to mongo (returns a promise) .then() it's .done()
        joe.save().then(() => done());
    });

    // creating the assertName function, a helper function so we don't repeat code so much. DRY.
    // two arguments, the operation parameter like joe.save() and done arguments everytime to finish. "done" will be used.
    function assertName(operation, done) {
        // the operation will be a promise object, like joe.save(), so we can add the .then's
        operation
          .then(() => User.find({}))
          .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
    });
}    

    
// MODEL INSTANCE UPDATES
    it('instance type using set n save', (done) => { 
        // inside of mongoose, if we ever want to update a property, we can use an instance method set(). first parameter is the property you want to update, second is what you want to update it to.
        // Remember, joe is an object
        // This is only done in memeory for the model, it does not actually change anything in the db yet
        joe.set('name', 'Alex');
        // to persist this "in stone" in our DB, we use joe.save()...

        assertName(joe.save(), done);
        
        // to persist the record changes to the db.
        // And make sure it worked. Empty object in find({}) gets ALL the records
        // Took out below code to make a re-usable function assertName() used above
            // .then(() => User.find({}))
            // .then((users) => {
            //     assert(users.length === 1);
            //     assert(users[0].name === 'Alex');
            //     done();
            // });
    });

    // update on a model instance 
    it('A model instance can update', (done) => {
        // simple here, take the joe instance, update this - rememebr joe.name is currently 'Joe'
        assertName(joe.updateOne({name: 'Alex'}), done);
    
    });



// MODEL CLASS UPDATES

    it('A model class can update', (done) => {
        // User because it's Model CLASS
        // first, what you want changed, then what you want it changed to, then done
        // assertName being used
        assertName(
            User.updateOne({name: 'Joe'}, {name: 'Alex'}),
            done
        );  
    });

    it('A model class can update one record', (done) => {
        // find a user with a particular something and update that attrbutes
        assertName(
            User.findOneAndUpdate({name: "Joe"}, {name: 'Alex'}), 
            done
        );
    });

    it('A model class can find a reocrd with an Id and update', (done) => {
        // use joe._id to locate object when using findByIdAndUpate
        
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'})
        , done);
    });



// UPDATE MANY
// By putting the x before it, x will make it so mocha will not run this test. "pending"
    it('A user can have their postcount incremented by 1', (done) => {
            // Find every user with the name of Joe, and update operator and find the postCount property
            // specify the type of operator you want to use then point it at the property you want to incrememnnt and how much you want to increment by
            // You could use $inc to decrement too, by making it a negative number
        User.updateMany({name: 'Joe'},  { $inc: { likes: 1 } })
            // add in query to pull the joe model out of collection and then make assertiuon about joe's postCount 
          .then(() => User.findOne({name: 'Joe'}))
          .then((user) => {
            assert(user.likes === 1);
            done();
        });
    });

});

