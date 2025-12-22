import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, TextField, Button, Box, Divider } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

//const ctx = require.context("../../images", false, /\.(png|jpe?g|gif)$/);

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  /* ============================================================
     NEW: Problem 2 - State để quản lý nội dung comment cho từng ảnh
     Sử dụng object { [photoId]: "nội dung" } để tránh bị gõ trùng các ô
     ============================================================ */
  const [commentText, setCommentText] = useState({});

  // Hàm tải dữ liệu ảnh (tách riêng để gọi lại khi cần update UI)
  const loadPhotos = () => {
    const url = `https://7kwtyg-8080.csb.app/api/photo/photosOfUser/${userId}`;
    fetchModel(url)
      .then((data) => setPhotos(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadPhotos();
  }, [userId]);

  /* ============================================================
     NEW: Problem 2 - Hàm xử lý gửi bình luận mới
     ============================================================ */
  const handleAddComment = async (photoId) => {
    const text = commentText[photoId];
    if (!text || !text.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      const response = await fetch(
        `https://7kwtyg-8080.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: text }),
          credentials: "include", // Quan trọng để gửi session cookie
        }
      );

      if (response.ok) {
        // Xóa trắng ô nhập sau khi gửi thành công
        setCommentText({ ...commentText, [photoId]: "" });
        // Tải lại dữ liệu ảnh để hiển thị comment mới ngay lập tức (Problem 2)
        loadPhotos();
      } else {
        const errText = await response.text();
        alert("Failed to add comment: " + errText);
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!photos.length) {
    return <Typography>Loading or No photos found...</Typography>;
  }

  return (
    <div className="user-photos-container">
      {photos.map((photo) => (
        <Box
          key={photo._id}
          sx={{
            marginBottom: "40px",
            padding: "10px",
            border: "1px solid #eee",
          }}
        >
          {/* HIỂN THỊ ẢNH */}
          <img src={`https://7kwtyg-8080.csb.app/images/${photo.file_name}`} />

          <Typography variant="caption" color="textSecondary">
            Posted at: {new Date(photo.date_time).toLocaleString()}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          {/* ============================================================
              NEW: Hiển thị danh sách bình luận hiện có
              ============================================================ */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Comments: ({photo.comments.length})
          </Typography>
          {photo.comments && photo.comments.length > 0 ? (
            photo.comments.map((c) => (
              <Box
                key={c._id}
                sx={{ marginBottom: "10px", paddingLeft: "15px" }}
              >
                <Typography variant="body2">
                  <Link
                    to={`/users/${c.user_id}`}
                    style={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    {c.user_id.first_name} {c.user_id.last_name}
                  </Link>
                  : {c.comment}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(c.date_time).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "gray" }}
            >
              No comments yet.
            </Typography>
          )}

          {/* ============================================================
              NEW: Problem 2 - Form nhập bình luận mới
              ============================================================ */}
          <Box sx={{ display: "flex", marginTop: "15px", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Add a comment..."
              variant="outlined"
              value={commentText[photo._id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [photo._id]: e.target.value })
              }
            />
            <Button
              variant="contained"
              onClick={() => handleAddComment(photo._id)}
              sx={{ whiteSpace: "nowrap" }}
            >
              Post
            </Button>
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default UserPhotos;
