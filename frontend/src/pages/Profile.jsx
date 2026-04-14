import React from "react";
import { useEffect, useState } from "react";
import { getProfile } from "../api/auth.js";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.data.user);
      } catch (err) {
        setError(error.response?.data?.message || "Login failed");
        {
          error && <p className="text-red-500 text-sm">{error}</p>;
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
