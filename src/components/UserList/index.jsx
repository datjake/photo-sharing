import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * UserList - hiển thị danh sách người dùng lấy từ backend.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("https://7kwtyg-8080.csb.app/api/user/list")
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="body1">User List</Typography>

      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
