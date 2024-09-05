/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => setSelectedUser(user);
  const handleClose = () => setSelectedUser(null);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <UserList onEdit={handleEdit} />
      {selectedUser && (
        <UserForm
          userToEdit={selectedUser}
          onClose={handleClose}
          onUserUpdated={(user) => setSelectedUser(user)}
          onUserCreated={(user) => setSelectedUser(user)}
        />
      )}
    </div>
  );
};

export default HomePage;
