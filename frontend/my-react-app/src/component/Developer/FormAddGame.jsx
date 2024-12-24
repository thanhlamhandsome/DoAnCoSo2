import React, { useState } from "react";

const FormAddGame = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    isPaid: false,
    price: 0,
    promoCode: "",
    url: "",
    image: null,
    genre: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    if (formData._id) form.append("_id", formData._id);
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("isPaid", formData.isPaid);
    form.append("price", formData.price);
    form.append("promoCode", formData.promoCode);
    form.append("url", formData.url);
    form.append("genre", formData.genre);
    if (formData.image) form.append("image", formData.image);

    try {
      await addGame(form);
      setFormData({
        _id: "",
        name: "",
        description: "",
        isPaid: false,
        price: 0,
        promoCode: "",
        url: "",
        image: null,
        genre: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Error adding/updating game:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8  rounded-xl shadow-lg max-w-4xl mx-auto mb-20"
    >
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
        Add New Game
      </h2>

      <div className="mb-6">
        <label className="block text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          Game Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-52 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter the game name"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-52 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        <label className="text-sm text-gray-200">Paid Game</label>
      </div>

      <div className="mb-6">
        <label className="block text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={`w-full px-6 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out ${
            !formData.isPaid
              ? "bg-gray-200 cursor-not-allowed border-gray-400" // Màu xám khi isPaid = false
              : "bg-white border-gray-300" // Màu bình thường khi isPaid = true
          }`}
          disabled={!formData.isPaid}
          placeholder="Enter the game price"
          min="0"
        />
      </div>

      <div className="mb-6">
        <label className="block  text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
          Game Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImage}
          className="w-full  py-3 mt-2 text-sm text-gray-500 file:py-3 file:px-6 file:border file:rounded-lg file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Game"
              className="w-56 h-56 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block  text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
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
        <label className="block  text-sm  font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="w-full px-52 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          placeholder="Enter Genre"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save Game
      </button>
    </form>
  );
};

export async function addGame(formData) {
    const token = localStorage.getItem('token')
    const response = await fetch("http://localhost:3000/developer", {
    method: "POST",
    headers: {
        Authorization: 'Bearer '+ token 
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Add game failed");
  }

  return await response.json();
}

export default FormAddGame;
