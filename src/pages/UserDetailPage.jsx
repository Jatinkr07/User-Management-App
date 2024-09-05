/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const users = await fetchUsers();
        const foundUser = users.find((user) => user.id === parseInt(id, 10));
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">User Details</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg mb-2">
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
