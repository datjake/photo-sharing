import React, { useEffect } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function EditProfile({ currentUser, onUpdateSuccess }) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // Đổ thông tin cũ vào ô nhập khi vừa mở trang
  useEffect(() => {
    if (currentUser) {
      reset({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        location: currentUser.location || "",
        occupation: currentUser.occupation || "",
        description: currentUser.description || "",
      });
    }
  }, [currentUser, reset]);

  const guiThongTin = async (data) => {
    try {
      const res = await fetch("https://7kwtyg-8080.csb.app/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (res.ok) {
        const userMoi = await res.json();
        onUpdateSuccess(userMoi); // Cập nhật state tổng ở App.js
        alert("Cập nhật thành công!");
        navigate(`/users/${userMoi._id}`); // Quay lại trang cá nhân
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, m: "40px auto", elevation: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Chỉnh sửa hồ sơ
      </Typography>

      <form onSubmit={handleSubmit(guiThongTin)}>
        <TextField
          fullWidth
          label="First Name"
          {...register("first_name")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Last Name"
          {...register("last_name")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Location"
          {...register("location")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Occupation"
          {...register("occupation")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          {...register("description")}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" fullWidth color="primary">
            Lưu lại
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            onClick={() => navigate(-1)}
          >
            Hủy
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default EditProfile;
