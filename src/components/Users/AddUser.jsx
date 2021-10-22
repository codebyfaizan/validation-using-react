import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {

  const nameInputRef = React.useRef();
  const ageInputRef = React.useRef();

  const [error, setError] = React.useState();

  function addUserHandler(event) {
    event.preventDefault();

    const userName = nameInputRef.current.value;
    const age = ageInputRef.current.value;

    if (
      userName.trim().length === 0 ||
      age.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid name and age (non-empty Values)",
      });
      return;
    }

    if (+age < 1 || +age > 100) {
      setError({
        title: "Invalid Age",
        message: "Please Enter age between 1 and 100",
      });
      return;
    }

    props.onAddUser(userName, age);

    nameInputRef.current.value= "";
    ageInputRef.current.value= "";
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <>
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
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (in Years)</label>
          <input
            name="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
}

export default AddUser;
