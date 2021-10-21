import React from "react";
import AddUser from "./Users/AddUser";
import UsersList from "./Users/UsersList";

function App() {
  const [usersList, setUsersList] = React.useState([]);

  function addUserHandler(userInput) {
    setUsersList([...usersList, userInput]);
    console.log(usersList);
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
