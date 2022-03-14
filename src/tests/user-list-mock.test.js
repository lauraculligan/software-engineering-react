import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com'},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com'},
]


test('user list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));
    const response = await findAllUsers();
    const users = response.users;

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
});