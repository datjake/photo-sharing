import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useMatch } from "react-router-dom";
import models from "../../modelData/models"; 

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const userMatch   = useMatch("/users/:userId");
    const photosMatch = useMatch("/photos/:userId");
    let rightText = "";
    if(userMatch?.params?.userId){
        const user = models.userModel(userMatch.params.userId);
        rightText = user ? `${user.first_name} ${user.last_name}` : "User Not Found";
    }
    else if(photosMatch?.params?.userId){
        const user = models.userModel(photosMatch.params.userId);
        rightText = user ? `Photo of ${user.first_name} ${user.last_name}` : "User Not Found";
    }
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Duong Quang Hao
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
