import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useMatch } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

/**
 * TopBar - Hiển thị thông tin trên thanh tiêu đề.
 */
function TopBar() {
  const userMatch = useMatch("/users/:userId");
  const photosMatch = useMatch("/photos/:userId");

  const [user, setUser] = useState(null);
  const userId =
    userMatch?.params?.userId || photosMatch?.params?.userId || null;

  useEffect(() => {
    if (!userId) return;

    fetchModel(`https://f6n7zh-8080.csb.app/api/user/${userId}`)
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [userId]);

  let rightText = "";

  if (userMatch?.params?.userId && user) {
    rightText = `${user.first_name} ${user.last_name}`;
  } else if (photosMatch?.params?.userId && user) {
    rightText = `Photos of ${user.first_name} ${user.last_name}`;
  } else if (userId && !user) {
    rightText = "User Not Found";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Nguyen Cao Dat
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {rightText && (
          <Typography variant="h6" color="inherit">
            {rightText}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
