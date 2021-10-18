import { useEffect, useState } from 'react';
import axios from 'axios';

function Users({ users }) {
    // const [users, setUsers] = useState([]);

    // const fetchUsers = async () => {
    //   const response = await axios.get(
    //     'https://jsonplaceholder.typicode.com/users'
    //   );
    //   const data = await response.data;

    //   setUsers(data);
    // };

    // console.log(users);

    // useEffect(() => {
    //   fetchUsers();
    // }, []);

    return (
        <div>
            {users.map((user) => (
                <div key={user.namerr}>
                    {user.name}
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    const data = await response.data;

    return {
        props: { users: data }, ///passando para props do meu componente
    };
}

export default Users;
