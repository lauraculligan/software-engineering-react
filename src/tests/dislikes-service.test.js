import {
    findAllTuitsDisLikedByUser,
    findAllUsersThatDisLikedTuit,
    userDisLikesTuit, userUnDisLikesTuit
} from "../services/dislikes-service";
import {findAllUsers} from "../services/users-service";


describe('user can dislike a tuit with REST API', () => {
    // variables to store object IDs
    let userID;
    let tuitID;
    let dislikeID;

    // sample user to like tuit
    const user = {
        username: 'dummy',
        password: 'dummy123',
        email: 'dummy@gmail.com'
    };

    // sample tuit to insert
    const tuit = {
        tuit: "test",
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
        await userUnDisLikesTuit(userID, tuitID);
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('userDisLikesTuit test', async () => {
        // insert new dislike in the database
        const testUser = await createUser(user);
        userID = testUser._id;
        const testTuit = await createTuit(testUser._id, tuit)
        tuitID = testTuit._id;
        const testDislike = await userDisLikesTuit(testUser._id, testTuit._id);
        dislikeID = testDislike._id;
        // verify tuit's dislike count increased
        expect(testTuit.stats.dislikes).toEqual(1);
    });
});

describe('user can undislike a tuit with REST API', () => {
    // variables to store object IDs
    let userID;
    let tuitID;
    let dislikeID;

    // sample user to like tuit
    const user = {
        username: 'dummy',
        password: 'dummy123',
        email: 'dummy@gmail.com'
    };

    // sample tuit to insert
    const tuit = {
        tuit: "test",
    };

    // setup test before running test
    beforeAll(async () => {
        // add user who is going to post the tuit
        const testUser = await createUser(user);
        userID = testUser._id;
        const testTuit = await createTuit(testUser._id, tuit)
        tuitID = testTuit._id;
        const testDislike = await userDisLikesTuit(testUser._id, testTuit._id);
        dislikeID = testDislike._id;
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        //console.log(tuitID);
        await userUnDisLikesTuit(userID, tuitID);
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('userUnDisLikesTuit test', async () => {
        // insert new dislike in the database
        await userUnDisLikesTuit(testUser._id, testTuit._id);
        // verify tuit's dislike count decreased
        expect(testTuit.stats.dislikes).toEqual(0);
    });
});


describe('can find all tuits disliked by a user with REST API', () => {
    // variables to store object IDs
    let userID;
    let tuitID1;
    let tuitID2;

    // sample user
    const user = {
        username: 'dummy',
        password: 'dummy123',
        email: 'dummy@gmail.com'
    };

    // sample tuit 1
    const tuit1 = {
        tuit: "test 1",
    };
    // sample tuit 2
    const tuit2 = {
        tuit: "test 2",
    };
    // setup test before running test
    beforeAll(async () => {
        // add user to dislike tuit
        const testUser = await createUser(user);
        userID = testUser._id;
        // add tuit to be disliked
        const testTuit1 = await createTuit(testUser._id, tuit1);
        tuitID1 = testTuit1._id;
        const testTuit2 = await createTuit(testUser._id, tuit2);
        tuitID2 = testTuit2._id;
        // user dislikes tuits
        await userDisLikesTuit(testUser._id, testTuit1._id);
        await userDisLikesTuit(testUser._id, testTuit2._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        //console.log(tuitID);
        await userUnDisLikesTuit(userID, tuitID);
        await userUnDisLikesTuit(userID, tuitID)
        await deleteTuit(tuitID);
        return deleteUsersByUsername(dummy.username);
    })

    test('findAllTuitsDisLikedByUser test', async () => {
        const dislikes = await findAllTuitsDisLikedByUser();

        // verify tuit's dislike count increased
        expect(testTuit.stats.dislikes).toEqual(1);
    });
});