import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRegister from "./components/LoginRegister";
import UserCommentLink from "./components/UserCommentLink";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
          />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            {currentUser && <UserList />}
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Routes>
              <Route
                path="/login"
                element={
                  currentUser ? (
                    <Navigate to={`/users/${currentUser._id}`} />
                  ) : (
                    <LoginRegister onLoginSuccess={setCurrentUser} />
                  )
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/photos/:userId"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    {/* SỬA: Truyền currentUser vào đây */}
                    <UserPhotos currentUser={currentUser} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/comments/:userId"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    {/* SỬA: Truyền currentUser vào đây */}
                    <UserCommentLink currentUser={currentUser} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  currentUser ? (
                    <Navigate to={`/users/${currentUser._id}`} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
