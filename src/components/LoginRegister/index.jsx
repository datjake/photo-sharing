import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginRegister({ onLoginSuccess }) {
  const navigate = useNavigate();

  /* ===== LOGIN FORM ===== */
  const { register: registerLogin, handleSubmit: handleLoginSubmit } =
    useForm();

  /* ===== REGISTER FORM ===== */
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    reset,
  } = useForm();

  const [mode, setMode] = useState("login"); // login | register
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ===== LOGIN ===== */
  const onLogin = async (data) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://7kwtyg-8080.csb.app/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      const user = await res.json();
      onLoginSuccess(user);
      navigate(`/users/${user._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  /* ===== REGISTER ===== */
  const onRegister = async (data) => {
    setError("");
    setSuccess("");

    if (data.password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://7kwtyg-8080.csb.app/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      setSuccess("Registration successful! Please login.");
      reset();
      setMode("login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* ================= LOGIN ================= */}
      {mode === "login" && (
        <>
          <Typography variant="h5">Please Login</Typography>

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

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setError("");
                setSuccess("");
                setMode("register");
              }}
            >
              Register Me
            </Button>
          </Box>
        </>
      )}

      {/* ================= REGISTER ================= */}
      {mode === "register" && (
        <>
          <Typography variant="h5">Register New User</Typography>

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
              Register
            </Button>

            <Button
              sx={{ marginLeft: 2 }}
              onClick={() => {
                setError("");
                setSuccess("");
                setMode("login");
              }}
            >
              Cancel
            </Button>
          </form>
        </>
      )}

      {/* ================= MESSAGE ================= */}
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography sx={{ marginTop: 2, color: "green" }}>{success}</Typography>
      )}
    </Box>
  );
}

export default LoginRegister;
