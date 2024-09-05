/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/apiService";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import LoadingSpinner from "./LoadingSpinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    handleCloseForm();
  };

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
    handleCloseForm();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">User List</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-600 bg-red-100 p-4 rounded mb-4">{error}</div>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <UserForm
            userToEdit={selectedUser}
            onClose={handleCloseForm}
            onUserUpdated={handleUserUpdated}
            onUserCreated={handleUserCreated}
          />
        </div>
      )}
      <button
        onClick={() => setShowForm(true)}
        className="mt-6 bg-teal-500 text-white px-6 py-3 rounded shadow-md hover:bg-teal-600 transition-colors duration-300"
      >
        Create New User
      </button>
    </div>
  );
};

export default UserList;
