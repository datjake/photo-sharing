import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * UserDetail - hiển thị thông tin chi tiết của user lấy từ backend.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel(`https://7kwtyg-8080.csb.app/api/user/${userId}`)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch(() => {
        setUser(null);
        setError("User Not Found");
      });
  }, [userId]);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <>
      <p>ID: {user._id}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Location: {user.location}</p>
      <p>Description: {user.description}</p>
      <p>Occupation: {user.occupation}</p>
      <Link to={`/photos/${user._id}`}>Photos</Link>
    </>
  );
}

export default UserDetail;
