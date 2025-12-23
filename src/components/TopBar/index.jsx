import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useMatch, useNavigate, Link } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function TopBar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const userMatch = useMatch("/users/:userId");
  const photosMatch = useMatch("/photos/:userId");
  const commentMatch = useMatch("/comments/:userId");

  const [user, setUser] = useState(null);
  const userId =
    userMatch?.params?.userId ||
    photosMatch?.params?.userId ||
    commentMatch?.params?.userId ||
    null;

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    fetchModel(`https://7kwtyg-8080.csb.app/api/user/${userId}`, {
      credentials: "include",
    })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [userId]);

  let rightText = "";
  if (userMatch?.params?.userId && user) {
    rightText = `${user.first_name} ${user.last_name}`;
  } else if (photosMatch?.params?.userId && user) {
    rightText = `Photos of ${user.first_name} ${user.last_name}`;
  } else if (commentMatch?.params?.userId && user) {
    rightText = `Comments of ${user.first_name} ${user.last_name}`;
  } else if (userId && !user) {
    rightText = "User Not Found";
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://7kwtyg-8080.csb.app/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        onLogout();
        navigate("/login");
      } else {
        const errorText = await response.text();
        alert("Logout failed: " + errorText);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handlePhotoUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const domForm = new FormData();
    domForm.append("photo", selectedFile);

    try {
      const response = await fetch(
        "https://7kwtyg-8080.csb.app/api/photo/new",
        {
          method: "POST",
          body: domForm,
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Photo added successfully!");
        navigate(`/photos/${currentUser._id}`, { replace: true });
      } else {
        const errorText = await response.text();
        alert("Upload failed: " + errorText);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading photo");
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Final Project
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {rightText && (
          <Typography variant="h6" color="inherit" sx={{ marginRight: 3 }}>
            {rightText}
          </Typography>
        )}

        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Nút Sửa Hồ Sơ mới thêm */}
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/edit-profile"
              sx={{ marginRight: 2, borderColor: "rgba(255,255,255,0.5)" }}
            >
              Edit Profile
            </Button>

            {/* Nút Add Photo */}
            <Button
              variant="contained"
              color="success"
              component="label"
              sx={{ marginRight: 2 }}
            >
              Add Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoUpload}
              />
            </Button>

            <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
              Hi {currentUser.first_name}
            </Typography>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
