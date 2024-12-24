import React, { useState, useEffect } from "react";

const FormAddGame = ({ onSave, gameData = {} }) => {
  const [formData, setFormData] = useState({
    _id: gameData._id || "",
    name: gameData.name || "",
    description: gameData.description || "",
    isPaid: gameData.isPaid || false,
    price: gameData.price || 0,
    promoCode: gameData. promoCode||0,
    url: gameData.url || "",
    image: gameData.image || null, // Giữ lại ảnh cũ nếu có
    genre: gameData.genre || "",
  });
  const [image, setImage] = useState(gameData.image || null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý thay đổi ảnh
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    // Hiển thị ảnh khi đã chọn
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Cập nhật ảnh
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    if (formData._id) {
      form.append("_id", formData._id);
    }
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("isPaid", formData.isPaid);
    form.append("price", formData.price);
    form.append("promoCode", formData.promoCode);
    form.append("url", formData.url);
    form.append("genre", formData.genre);

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (gameData._id) {
        // Nếu có gameData (dùng để update)
        await updateGame(form);
      } else {
        // Nếu không có gameData (dùng để add)
        await addGame(form);
      }

      // Reset form sau khi lưu
      setFormData({
        name: "",
        description: "",
        isPaid: false,
        price: 0,
        url: "",
        image: null,
        genre: "",
      });
      setImage(null); // Reset image
    } catch (err) {
      console.error("Error adding/updating game:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Add New Game
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Game Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter the game name"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          rows="4"
          placeholder="Enter the game description"
          required
        />
      </div>

      <div className="mb-6 flex items-center space-x-3">
        <input
          type="checkbox"
          name="isPaid"
          checked={formData.isPaid}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm text-gray-700">Paid Game</label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          disabled={!formData.isPaid}
          placeholder="Enter the game price"
          min="0"
          step="0.01"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Game URL
        </label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter the game URL"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Promo Code
        </label>
        <input
          type="text"
          name="promoCode"
          value={formData.promoCode}
          onChange={handleInputChange}
          className={`w-full px-6 py-3 mt-2 border ${
            formData.isPaid && formData.price!==0
              ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
              : "border-gray-300 bg-gray-100 cursor-not-allowed"
          } rounded-lg focus:outline-none transition duration-300 ease-in-out`}
          placeholder="Promo Code"
          disabled={!formData.isPaid} // Vô hiệu hóa nếu isPaid === false
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Game Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImage}
          className="w-full px-6 py-3 mt-2 text-sm text-gray-500 file:py-3 file:px-6 file:border file:rounded-lg file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-300 ease-in-out"
        />
        {/* Hiển thị ảnh nếu có */}
        {image && (
          <div className="relative">
            <img src={image} alt="Game Image" className="w-56 h-56 " />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter Genre"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      >
        Save Game
      </button>
    </form>
  );
};

export async function addGame(formData) {
  const response = await fetch("http://localhost:3000/games", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Add game failed");
  }

  const resData = await response.json();
  console.log(resData);
  window.location.reload();
  return resData;
}

export async function updateGame(formData) {
  const response = await fetch("http://localhost:3000/updategame", {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Update game failed");
  }

  const resData = await response.json();
  console.log(resData);
  window.location.reload();
  return resData;
}

export default FormAddGame;
