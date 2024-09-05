/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/apiService";

const UserForm = ({ userToEdit, onClose, onUserUpdated, onUserCreated }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(userToEdit || { name: "", email: "", phone: "" });
  }, [userToEdit]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        const updatedUser = await updateUser(userToEdit.id, user);
        onUserUpdated(updatedUser);
      } else {
        const newUser = await createUser(user);
        onUserCreated(newUser);
      }
      onClose();
    } catch (error) {
      setError(`Failed to save user: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-50 shadow-lg rounded-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {userToEdit ? "Edit User" : "Create User"}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-5">
        <InputField
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          label="Name"
        />
        <InputField
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          label="Email"
          type="email"
        />
        <InputField
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          label="Phone"
        />
      </div>
      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
        >
          {userToEdit ? "Update User" : "Create User"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const InputField = ({ id, name, value, onChange, label, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium mb-2 text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      required
    />
  </div>
);

export default UserForm;
