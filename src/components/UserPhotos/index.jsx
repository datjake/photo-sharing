import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
const ctx = require.context("../../images", false, /\.(png|jpe?g|gif|svg)$/);

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const user = useParams();
    const userPhoto = models.photoOfUserModel(user.userId)[0];
    return (
      <>
        <img src={ctx(`./${userPhoto.file_name}`)} alt="user photo" />
      </>
    );
}

export default UserPhotos;
