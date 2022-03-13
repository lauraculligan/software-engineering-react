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
    // variable to store tuitID
    let tuitID;

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
    afterAll(async () => {
        // remove any data we created
        //console.log(tuitID);
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new tuit in the database
        const dummyUser = await createUser(dummy);
        const newTuit = await createTuit(dummyUser._id, hello)
        tuitID = newTuit._id;
        // verify inserted tuit's properties match parameter user
        expect(newTuit.tuit).toEqual(hello.tuit);
    });
});


describe('can delete tuit with REST API', () => {
    // variable to store tuitID
    let tuitID;

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
    afterAll(async () => {
        // remove any data we created
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('can delete tuit with REST API', async () => {
        // create user to post tuit
        const dummyUser = await createUser(dummy);
        // create tuit to delete so we have access to id here
        const newTuit = await createTuit(dummyUser._id, hello);
        tuitID = newTuit._id;
        // delete a tuit. Assumes tuit already exists
        const status = await deleteTuit(newTuit._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });


});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    // variable to store tuitID
    let tuitID;

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
    afterAll(async () => {
        // remove any data we created
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // create user to post tuit
        const dummyUser = await createUser(dummy);
        // create tuit
        const newTuit = await createTuit(dummyUser._id, hello);
        tuitID = newTuit._id;

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(hello.tuit);
    });

});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    // sample user to insert tuits
    const dummy = {
        username: 'dummy',
        password: 'dummy123',
        email: 'dummy@gmail.com'
    };

    // sample tuits we'll insert to then retrieve
    const tuits = [
        "hello", "hi"
    ];

    // sample tuits to insert
    const hello = {
        tuit: "hello",
    };
    let helloID;
    const hi = {
        tuit: "hi",
    };
    let hiID;

    // setup data before test
    beforeAll(  () => {
        // create user to post tuit
        return deleteUsersByUsername(dummy.username);
    })

    // clean up after ourselves
    afterAll( async () => {
        // delete the users we inserted
        await deleteTuit(hiID);
        await deleteTuit(helloID);
        return deleteUsersByUsername(dummy.username);
    })

    test('can retrieve all tuits with REST API', async () => {
        // insert user
        const dummyUser = await createUser(dummy);

        // insert tuits
        const helloTuit = await createTuit(dummyUser._id, hello);
        helloID = helloTuit._id;
        const hiTuit = await createTuit(dummyUser._id, hi);
        hiID = hiTuit._id;

        // retrieve all the tuits
        const allTuits = await findAllTuits();

        // there should be a minimum number of tuits
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitText = tuits.find(tuitText => tuitText === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitText);
        });
    });
});