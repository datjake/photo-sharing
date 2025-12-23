import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, TextField, Button, Box, Divider } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos({ currentUser }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const loadPhotos = () => {
    fetchModel(
      `https://7kwtyg-8080.csb.app/api/photo/photosOfUser/${userId}`
    ).then((data) => setPhotos(data));
  };

  useEffect(() => {
    loadPhotos();
  }, [userId]);

  const handleAddComment = async (photoId) => {
    const text = commentText[photoId];
    if (!text?.trim()) return alert("Enter a comment");
    const res = await fetch(
      `https://7kwtyg-8080.csb.app/api/photo/commentsOfPhoto/${photoId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text }),
        credentials: "include",
      }
    );
    if (res.ok) {
      setCommentText({ ...commentText, [photoId]: "" });
      loadPhotos();
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete?")) return;
    const res = await fetch(
      `https://7kwtyg-8080.csb.app/api/photo/comment/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) loadPhotos();
  };

  const handleUpdate = async (commentId) => {
    const res = await fetch(
      `https://7kwtyg-8080.csb.app/api/photo/comment/${commentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: editText }),
      }
    );
    if (res.ok) {
      setEditingId(null);
      loadPhotos();
    }
  };

  return (
    <Box className="user-photos-container">
      {photos.map((photo) => (
        <Box key={photo._id} sx={{ mb: 5, p: 2, border: "1px solid #eee" }}>
          <img
            src={`https://7kwtyg-8080.csb.app/images/${photo.file_name}`}
            alt=""
          />
          <Typography variant="caption" display="block">
            Posted: {new Date(photo.date_time).toLocaleString()}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Comments:
          </Typography>

          {photo.comments?.map((c) => (
            <Box
              key={c._id}
              sx={{ mb: 1, pl: 2, borderLeft: "2px solid #f0f0f0" }}
            >
              {editingId === c._id ? (
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Button onClick={() => handleUpdate(c._id)}>Save</Button>
                  <Button onClick={() => setEditingId(null)}>Cancel</Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">
                    <Link to={`/users/${c.user_id._id}`}>
                      <b>
                        {c.user_id.first_name} {c.user_id.last_name}
                      </b>
                    </Link>
                    : {c.comment}
                  </Typography>
                  {currentUser?._id === c.user_id._id && (
                    <Box>
                      <Button
                        size="small"
                        onClick={() => {
                          setEditingId(c._id);
                          setEditText(c.comment);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          ))}

          <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Add comment..."
              value={commentText[photo._id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [photo._id]: e.target.value })
              }
            />
            <Button
              variant="contained"
              onClick={() => handleAddComment(photo._id)}
            >
              Post
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default UserPhotos;
