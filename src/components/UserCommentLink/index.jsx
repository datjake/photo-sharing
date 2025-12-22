import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function UserCommentLinks() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(
      `https://7kwtyg-8080.csb.app/api/photo/commentOfUser/${userId}`
    ).then((data) => setComments(data));
  }, [userId]);

  if (!comments.length) {
    return <Typography>No comments found.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Your Comments</Typography>

      {comments.map((c) => (
        <Box
          key={c.comment_id}
          sx={{ marginTop: 2, padding: 1, border: "1px solid #ddd" }}
        >
          <Link to={`/photos/${c.photo_id}`}>
            <img
              src={`https://7kwtyg-8080.csb.app/images/${c.file_name}`}
              alt=""
              width={100}
            />
          </Link>

          <Typography variant="body2">
            <Link to={`/photos/${c.photo_id}`}>{c.comment}</Link>
          </Typography>

          <Typography variant="caption">
            {new Date(c.date_time).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default UserCommentLinks;
