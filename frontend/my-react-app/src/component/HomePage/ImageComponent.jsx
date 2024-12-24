import { useEffect, useState } from "react";

function ImageComponent({ gameId }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${gameId}/image`);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (e) {
        console.error('Không thể tải hình ảnh:', e);
      }
    };

    fetchImage();

    // Hàm cleanup để giải phóng bộ nhớ của object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [gameId]); // Bao gồm `imageUrl` trong mảng phụ thuộc để đảm bảo cleanup hiệu quả

  return (
    <img
      className="object-fill top-0 right-0 h-[93%] mt-6 absolute  "
      src={imageUrl}
      alt="Hình ảnh trò chơi"
    />
  );
}

export default ImageComponent;
