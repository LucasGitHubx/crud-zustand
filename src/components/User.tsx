import { useUsersStore } from "../store/usersStore";
import { useState, useRef } from "react";
import { User } from "../types";

interface Props {
  user: User;
}

export default function UserRender({ user }: Props) {
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const updateUser = useUsersStore((state) => state.updateUser);

  const [activeModal, setActiveModal] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    deleteUser(user.userID);
  }

  function handleActiveUpdate(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setActiveModal(!activeModal);
  }

  function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (formRef.current !== null) {
      const name = formRef.current.username.value;
      const lastname = formRef.current.lastname.value;
      const age = formRef.current.age.value;

      const updatedUser: User = {
        userID: user.userID,
        userName: name + " ",
        userlastName: lastname,
        userAge: age,
      };

      updateUser(updatedUser, user.userID);
      formRef.current.reset();
    }
  }

  return (
    <div className="user">
      <div className="info">
        <h3>
          {user.userName} {user.userlastName}
        </h3>
        <p>
          <i>{user.userAge}</i> Years Old
        </p>
      </div>
      <div className="buttons">
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="update" onClick={handleActiveUpdate}>
          Update
        </button>
      </div>
      <div className={activeModal ? "modal active" : "modal"}>
        <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
          <label>Insert name</label>
          <input type="text" name="username" placeholder="E.g Rodrigo" />

          <label>Insert lastname</label>
          <input type="text" name="lastname" placeholder="E.g Johnson" />

          <label>Insert age</label>
          <input type="number" name="age" />

          <div className="buttons">
            <button onClick={handleUpdate}>Update</button>
            <button
              onClick={() => setActiveModal(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
