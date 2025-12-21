import React, { useState } from "react";

import { Typography, TextField, Button } from "@mui/material";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

function LoginRegister({ onLoginSuccess }) {
  const navigate = useNavigate();

  /* ===== LOGIN FORM ===== */

  const {
    register: registerLogin,

    handleSubmit: handleLoginSubmit,

    formState: { errors: loginErrors },
  } = useForm();

  /* ===== REGISTER FORM ===== */

  const {
    register: registerRegister,

    handleSubmit: handleRegisterSubmit,

    reset,

    watch,

    formState: { errors: registerErrors },
  } = useForm();

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("error");

  /* ===== LOGIN ===== */

  const onLogin = async (data) => {
    try {
      const res = await fetch("https://7kwtyg-8080.csb.app/api/admin/login", {
        method: "POST",

        credentials: "include",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();

        throw new Error(err);
      }

      const user = await res.json();

      onLoginSuccess(user);

      navigate(`/users/${user._id}`);
    } catch (err) {
      setMessageType("error");

      setMessage(err.message);
    }
  };

  /* ===== REGISTER ===== */

  const onRegister = async (data) => {
    if (data.password !== data.confirm_password) {
      setMessageType("error");

      setMessage("Passwords do not match");

      return;
    }

    try {
      const res = await fetch("https://7kwtyg-8080.csb.app/api/user/register", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();

        throw new Error(err);
      }

      setMessageType("success");

      setMessage("Registration successful!");

      reset();
    } catch (err) {
      setMessageType("error");

      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Please Login</Typography>

      {/* ===== LOGIN FORM ===== */}

      <form onSubmit={handleLoginSubmit(onLogin)}>
        <TextField
          label="Login Name"
          fullWidth
          margin="normal"
          {...registerLogin("login_name", { required: true })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...registerLogin("password", { required: true })}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>

      <hr />

      <Typography variant="h5">Register New User</Typography>

      {/* ===== REGISTER FORM ===== */}

      <form onSubmit={handleRegisterSubmit(onRegister)}>
        <TextField
          label="Login Name"
          fullWidth
          margin="normal"
          {...registerRegister("login_name", { required: true })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...registerRegister("password", { required: true })}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...registerRegister("confirm_password", { required: true })}
        />

        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...registerRegister("first_name", { required: true })}
        />

        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...registerRegister("last_name", { required: true })}
        />

        <TextField
          label="Location"
          fullWidth
          margin="normal"
          {...registerRegister("location")}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          {...registerRegister("description")}
        />

        <TextField
          label="Occupation"
          fullWidth
          margin="normal"
          {...registerRegister("occupation")}
        />

        <Button type="submit" variant="contained" color="success">
          Register Me
        </Button>
      </form>

      {message && (
        <Typography
          sx={{ marginTop: 2 }}
          color={messageType === "error" ? "error" : "green"}
        >
          {message}
        </Typography>
      )}
    </div>
  );
}

export default LoginRegister;
