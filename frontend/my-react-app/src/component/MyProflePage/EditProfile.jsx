import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import { Form } from "react-router-dom";
const EditProfile = ({ data }) => {
  const avatar = useSelector((state) => state.ui.updateAvatar);
  const dispatch = useDispatch();
  const formatDate = (date) => {
    const d = new Date(date); // Đảm bảo rằng "date" là một đối tượng Date
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Thêm số 0 ở đầu nếu cần
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const formData = new FormData(event.target);
      if (avatar) {
        formData.append("avatar",avatar );
      }

      const response = await fetch("http://localhost:3000/updateuser", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const resData = await response.json();
      if (!response.ok) {
        dispatch(uiAction.setShowHiddenDiv({status:'error',message : resData.message}))
      }
      dispatch(uiAction.setShowHiddenDiv({status:'success',message : resData.message}))
    
      
      return resData;
    };

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      className="h-screen flex justify-center items-center bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-700"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Update Your Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              name
            </label>
            <input
              defaultValue={data.name}
              id="name"
              name="name"
              type="text"
              placeholder="John"
              required
              className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all "
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              defaultValue={data.email}
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              defaultValue={formatDate(data.birthdate)}
              id="birthdate"
              name="birthdate"
              type="date"
              required
              className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              defaultValue={data.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="123-456-7890"
              className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
              className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EditProfile;
