import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Button, TextField } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function UserCommentLinks({ currentUser }) {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const loadComments = () => {
    fetchModel(
      `https://7kwtyg-8080.csb.app/api/photo/commentOfUser/${userId}`
    ).then((data) => setComments(data));
  };

  useEffect(() => {
    loadComments();
  }, [userId]);

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    const res = await fetch(
      `https://7kwtyg-8080.csb.app/api/photo/comment/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) loadComments();
    else alert("Delete failed");
  };

  const handleUpdate = async (commentId) => {
    const res = await fetch(
      `https://7kwtyg-8080.csb.app/api/photo/comment/${commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: editText }), // Khớp với req.body.comment ở Backend
      }
    );
    if (res.ok) {
      setEditingId(null);
      setEditText("");
      loadComments();
    } else alert("Update failed");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Your Comments</Typography>
      {comments.map((c) => (
        <Box key={c.comment_id} sx={{ border: "1px solid #ddd", p: 2, mt: 2 }}>
          <Link to={`/photos/${c.photo_owner_id}`}>
            <img
              src={`https://7kwtyg-8080.csb.app/images/${c.file_name}`}
              width={100}
              alt=""
            />
          </Link>

          {editingId === c.comment_id ? (
            <Box>
              <TextField
                fullWidth
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                sx={{ mt: 1 }}
              />
              <Button size="small" onClick={() => handleUpdate(c.comment_id)}>
                Save
              </Button>
              <Button
                size="small"
                color="inherit"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Typography sx={{ my: 1 }}>{c.comment}</Typography>
          )}

          <Typography variant="caption" display="block">
            {new Date(c.date_time).toLocaleString()}
          </Typography>

          {currentUser?._id === userId && (
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                onClick={() => {
                  setEditingId(c.comment_id);
                  setEditText(c.comment);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(c.comment_id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default UserCommentLinks;
