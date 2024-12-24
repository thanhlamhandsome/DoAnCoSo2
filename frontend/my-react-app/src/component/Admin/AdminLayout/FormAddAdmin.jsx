import React, { useState, useEffect } from "react";
import { Form, json } from "react-router-dom";
function FormAddAdmin({user}){
     const [avatar, setAvatar] = useState(
        "https://randomuser.me/api/portraits/men/1.jpg"
      );
      const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        email: "",
        password: "",
        avatar: "",
        userType : '' , 
        confirmPassword: "",
        phoneNumber: "",
      });
    
      useEffect(() => {
        if (user) {
          setFormData({
            name: user.name || "",
            birthdate: user.birthdate
              ? new Date(user.birthdate).toISOString().split("T")[0]
              : "", // Ensure birthdate is formatted as YYYY-MM-DD
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            avatar: user.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
            password: "",
            userType : user.userType|| '' , 
            confirmPassword: "",
            id: user._id,
          });
          setAvatar(user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"); // Update avatar state
        } else {
          setFormData({
            name: "",
            birthdate: "",
            email: "",
            userType:'', 
            phoneNumber: "",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            password: "",
            confirmPassword: "",
          });
          setAvatar("https://randomuser.me/api/portraits/men/1.jpg"); // Reset avatar state to default
        }
      }, [user]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const [avatarFile, setAvatarFile] = useState(null);
    
      const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setAvatarFile(file);
    
          // Hiển thị ảnh mới (nếu cần)
          const reader = new FileReader();
          reader.onload = () => {
            setAvatar(reader.result); // Cập nhật avatar (URL ảnh hiển thị)
          };
          reader.readAsDataURL(file);
        }
      };
 return (
     <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
       <h2 className="text-2xl font-semibold mb-6">Add New Admin</h2>
       <Form
         method="post"
         encType="multipart/form-data"
         onSubmit={(event) => {
           event.preventDefault(); // Prevent default form submission
 
           const form = new FormData(event.target);
 
           // Remove password if it's empty
           if (!formData.password) {
             form.delete("password");
           }
 
           // Only add avatar to form if it's provided
           if (avatarFile) {
             form.set("avatar", avatarFile);
           }
 
           // Set _id if updating, else leave it out for new users
           if (user) {
             form.set("_id", user._id); // Include _id only for updating
             updateAdmin(form); // Call updateUser if user is being updated
             form.set("actionType", "updateAdmin")
           } else {
              form.set("actionType", "addAdmin");
             addAdmin(form); // Call addUser if it's a new user
           }
 
           // Reset the form after successful submission
           setFormData({
             name: "",
             birthdate: "",
             email: "",
             phoneNumber: "",
             avatar: "https://randomuser.me/api/portraits/men/1.jpg",
             password: "",
             confirmPassword: "",
           });
           setAvatar("https://randomuser.me/api/portraits/men/1.jpg");
           setAvatarFile(null);
 
           // Notify user of success (optional)
           alert("Form submitted successfully!");
         }}
       >
         <div className="flex justify-center mb-4">
           {/* Avatar */}
           <div className="relative">
             <img
               src={avatar}
               alt="Avatar"
               className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 cursor-pointer"
             />
             <input
               type="file"
               accept="image/*"
               onChange={handleAvatarChange}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
           </div>
         </div>
 
         {/* Name */}
         <div className="mb-4">
           <label
             htmlFor="name"
             className="block text-sm font-semibold text-gray-600"
           >
             Name
           </label>
           <input
             type="text"
             id="name"
             name="name"
             value={formData.name}
             onChange={handleInputChange}
             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
 
         {/* Birthdate */}
         <div className="mb-4">
           <label
             htmlFor="birthdate"
             className="block text-sm font-semibold text-gray-600"
           >
             Birthdate
           </label>
           <input
             type="date"
             id="birthdate"
             name="birthdate"
             value={formData.birthdate}
             onChange={handleInputChange}
             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
 
         {/* Email */}
         <div className="mb-4">
           <label
             htmlFor="email"
             className="block text-sm font-semibold text-gray-600"
           >
             Email
           </label>
           <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleInputChange}
             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
 
         {/* Password */}
         <div className="mb-4">
           <label
             htmlFor="password"
             className="block text-sm font-semibold text-gray-600"
           >
             Password
           </label>
           <input
             type="password"
             id="password"
             name="password"
             value={formData.password}
             onChange={handleInputChange}
             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
             required={!user}
           />
         </div>
 
         {/* Confirm Password */}
         {!user && (
           <div className="mb-4">
             <label
               htmlFor="confirmPassword"
               className="block text-sm font-semibold text-gray-600"
             >
               Confirm Password
             </label>
             <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               value={formData.confirmPassword}
               onChange={handleInputChange}
               className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
               required
             />
           </div>
         )}
         {user && (
           <div className="mb-4">
             <label
               htmlFor="userType"
               className="block text-sm font-semibold text-gray-600"
             >
               User Type
             </label>
             <input
               type="text"
               id="userType"
               name="userType"
               value={formData.userType}
               onChange={handleInputChange}
               className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
               required
             />
           </div>
         )}
 
 
         {/* Phone Number */}
         <div className="mb-6">
           <label
             htmlFor="phoneNumber"
             className="block text-sm font-semibold text-gray-600"
           >
             Phone Number
           </label>
           <input
             type="tel"
             id="phoneNumber"
             name="phoneNumber"
             value={formData.phoneNumber}
             onChange={handleInputChange}
             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
 
         <div className="flex justify-end">
           <button
             type="submit"
             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500"
           >
             {user ? "Update" : "Add Admin"}
           </button>
         </div>
       </Form>
     </div>
   );

}

export async function updateAdmin(form) {
  try {
    const response = await fetch("http://localhost:3000/updateadmin", {
      method: "PATCH",
      body: form,
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Update user failed: ${errorMessage}`);
    }

    const resData = await response.json();
    console.log("User updated successfully:", resData);
    
    window.location.reload();
    return resData;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function addAdmin(form) {
  const response = await fetch("http://localhost:3000/addadmin", {
    method: "POST",
    body: form, // FormData tự động xác định Content-Type
  });

  if (!response.ok) {
    throw json("Add user failed");
  }
  const resData = await response.json();
  console.log(resData);
  window.location.reload();
  return resData;
}


export default FormAddAdmin
