import { useUsersStore } from "../store/usersStore";
import { useState } from "react";
import { User, UserID } from "../types";

interface Props {
  user: User;
}

export default function User({ user }: Props) {
  const deleteUser = useUsersStore((state) => state.deleteUser);

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    deleteUser(user.userID);
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
        <button className="update">Update</button>
      </div>
    </div>
  );
}
