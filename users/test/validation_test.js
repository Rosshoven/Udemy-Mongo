const assert =  require('assert');
const User = require('../src/user');

describe('Validating records', () => {

    it('requires a user name', () => {
      const user = new User({ name: undefined });
    //   validateSync is a synchronous validation process (just validate() does not return a validation result, it needs a callback)
    // after being defined above, user has access to many methods, here we use validateSync();
      const validationResult = user.validateSync();
    //   console.log(validationResult);
    //   getting a hold of the error message in the error object in the console. Using a little decontstrucing
    //   const message = validationResult.errors.name.message;
    const { message } = validationResult.errors.name;
    console.log(message);
        assert(message === 'Name is required.');
    });

    it('requires a user name longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message === 'Name must be longer than 2 characters');
    });

    it('disallows invalid records from being saved', (done) => {
      const user = new User({name: 'Al'});
      user.save()
    //   when a promise is rejected, use .catch()
        .catch((validationResult) => {
          const { message } = validationResult.errors.name;

          assert(message === 'Name must be longer than 2 characters');
          done();
        });

    });

});