import React from "react";
import { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { getProfile } from "../api/auth.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  },[]);

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

      localStorage.setItem("token", res.data.data.token);

      navigate("/profile");
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <form
        onSubmit={handleSubmit}
        className="bg-background shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
