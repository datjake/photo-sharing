import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // import hàm fetchModel

function UserPhotos() {
  const { userId } = useParams();
  const [userPhoto, setUserPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL backend để lấy dữ liệu ảnh người dùng
    const url = `https://f6n7zh-8080.csb.app/photos?userId=${userId}`;

    fetchModel(url)
      .then((data) => {
        if (data && data.length > 0) {
          setUserPhoto(data[0]); // lấy ảnh đầu tiên
        } else {
          setError("No photos found for this user");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [userId]);

  if (error) return <p>{error}</p>;
  if (!userPhoto) return <p>Loading...</p>;

  return (
    <div>
      <img src={userPhoto.file_url} alt="user photo" />
    </div>
  );
}

export default UserPhotos;
