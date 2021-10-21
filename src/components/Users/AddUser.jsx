import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [userInput, setUserInput] = React.useState({
    userName: "",
    age: "",
  });

  const [error, setError] = React.useState();

  function userInputHandler(event) {
    const { name, value } = event.target;
    userInput[name] = value;
    setUserInput({ ...userInput });
  }

  function addUserHandler(event) {
    event.preventDefault();

    if (
      userInput.userName.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid name and age (non-empty Values)",
      });
      return;
    }

    if (userInput.age < 1 || userInput.age > 100) {
      setError({
        title: "Invalid Age",
        message: "Please Enter age between 1 and 100",
      });
      return;
    }

    props.onAddUser(userInput);

    setUserInput({
      userName: "",
      age: "",
    });
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            type="text"
            onChange={userInputHandler}
            value={userInput.userName}
          />
          <label htmlFor="age">Age (in Years)</label>
          <input
            name="age"
            type="number"
            onChange={userInputHandler}
            value={userInput.age}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
