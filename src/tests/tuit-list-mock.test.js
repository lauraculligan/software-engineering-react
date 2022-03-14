import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice@gmail.com'},
    {username: 'bob', password: 'bob123', email: 'bob@gmail.com'},
    {username: 'charlie', password: 'charlie123', email: 'charlie@gmail.com'},
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: MOCKED_USERS[0]._id},
    {tuit: "bob's tuit", postedBy: MOCKED_USERS[1]._id},
    {tuit: "charlie's tuit", postedBy: MOCKED_USERS[2]._id}
];

test('tuit list renders mocked', async () => {
    // TODO: implement this
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const aliceElement = screen.getByText(/alice's tuit/i);
    const bobElement = screen.getByText(/bob's tuit/i);
    const charlieElement = screen.getByText(/charlie's tuit/i);
    expect(aliceElement).toBeInTheDocument();
    expect(bobElement).toBeInTheDocument();
    expect(charlieElement).toBeInTheDocument();
});
