/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const UserItem = ({ user, onEdit, onDelete }) => (
  <li className="flex justify-between items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-100 transition-colors duration-300 rounded-md shadow-lg">
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-800">{user.email}</p>
      <p className="text-sm text-gray-800">{user.phone}</p>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(user)}
        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-300"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user.id)}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
      >
        Delete
      </button>
    </div>
  </li>
);

export default UserItem;
