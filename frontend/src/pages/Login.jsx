import React from "react";
import { useState, useEffect } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        console.log(res.data);
      } catch (err) {
        console.error("Not authorized");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      console.log(res.data);

      localStorage.setItem("token", res.data.data.token);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
