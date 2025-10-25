import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const userModel = models.userModel(user.userId);
    return (
        <>
          <p>ID: { userModel._id }</p>
          <p>First Name: { userModel.first_name }</p>
          <p>Last Name: { userModel.last_name }</p>
          <p>Location: { userModel.location }</p>
          <p>Description: { userModel.description }</p>
          <p>Occupation: { userModel.occupation }</p>
        </>
    );
}

export default UserDetail;
