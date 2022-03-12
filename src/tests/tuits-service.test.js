import {
    findAllTuits,
    findTuitById,
    findTuitByUser,
    createTuit,
    updateTuit,
    deleteTuit
} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this

    // sample user to insert tuit
    const dummy = {
        username: 'dummy',
        password: 'dummy123',
        email: 'dummy@gmail.com'
    };

    // sample tuit to insert
    const hello = {
        tuit: "hello",
    };

    // setup test before running test
    beforeAll(() => {
        // add user who is going to post the tuit
        return deleteUsersByUsername(dummy.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(dummy.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new tuit in the database
        const dummyUser = await createUser(dummy);
        const newTuit = await createTuit(dummyUser._id, hello)

        // verify inserted tuit's properties match parameter user
        expect(newTuit.tuit).toEqual(hello.tuit);
    });

});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});