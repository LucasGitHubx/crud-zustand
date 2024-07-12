import Form from "./components/Form";
import User from "./components/User";
import { useUsersStore } from "./store/usersStore";

export default function App() {
  const users = useUsersStore((state) => state.users);

  console.log(users);

  return (
    <div className="App">
      <header>
        <h1>
          CRUD with <span>TypeScript</span>
        </h1>
      </header>

      <Form />

      <div className="users">
        {users.length == 0 ? (
          <h2 className="h2-info">There are no users for the moment</h2>
        ) : (
          users.map((user) => {
            return <User user={user} />;
          })
        )}
      </div>
    </div>
  );
}

/*
NEXT:

Render the users.
*/
