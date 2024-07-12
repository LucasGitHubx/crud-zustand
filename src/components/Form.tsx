import { useState, useRef } from "react";
import { useUsersStore } from "../store/usersStore";

export default function Form() {
  const addUser = useUsersStore((state) => state.addUser);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const [nameError, setNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);

  const formRef = useRef(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameAndLastNameRegex: RegExp = /^.{3,20}$/;

    if (nameAndLastNameRegex.test(name)) {
      setNameError(false);
    } else {
      setNameError(true);
    }

    if (nameAndLastNameRegex.test(lastName)) {
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }

    if (age > 0 && age < 100) {
      setAgeError(false);
    } else {
      setAgeError(true);
    }

    // We check if the regular expression fits with the name and the lastname and we also check
    // if the age is on the range 0-100
    if (
      nameAndLastNameRegex.test(name) &&
      nameAndLastNameRegex.test(lastName) &&
      age > 0 &&
      age < 100
    ) {
      setName("");
      setLastName("");
      setAge(0);

      addUser({
        userID: crypto.randomUUID(),
        userName: name,
        userlastName: lastName,
        userAge: age,
      });

      if (formRef.current != undefined) {
        formRef.current.reset();
      }
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} ref={formRef}>
      <label className={nameError ? "error" : undefined}>
        {!nameError ? "Insert name" : "It must be between 3 and 20 chars"}
      </label>
      <input
        type="text"
        name="name"
        className={nameError ? "error" : undefined}
        placeholder="E.g Marcos"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label className={lastNameError ? "error" : undefined}>
        {!lastNameError
          ? "Insert lastname"
          : "It must be between 3 and 20 chars"}
      </label>
      <input
        type="text"
        name="lastname"
        className={lastNameError ? "error" : undefined}
        placeholder="E.g Rutherford"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label className={ageError ? "error" : undefined}>
        {!ageError ? "Insert age" : "It must be between 0 and 110"}
      </label>
      <input
        type="number"
        name="age"
        className={ageError ? "error" : undefined}
        onChange={(e) => setAge(Number(e.target.value))}
      />

      <button>Add User</button>
    </form>
  );
}
