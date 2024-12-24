const express = require('express'); 
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("File not match"));
    }
    cb(undefined, true);
  },
});
const User = require('../module/user'); 
const route = express.Router(); 
route.post('/loginadmin',async(req,res)=>{
   try{
    console.log(req.body)
    let admin = await User.findByCredentials({
        email : req.body.email , 
        password : req.body.password
    }) ;
     if(admin.userType === 'guest'){
        return res.status(400).send({message : 'You not must Admin'})
     }
     res.status(200).send(admin)
    
   }catch(e){
      console.log(e); 
      res.status(400).send({message: e.message})
   }
})
route.delete("/admin", async (req, res) => {
  try {
    const admin = await User.findByIdAndDelete(req.body._id);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({ message: "Delete User Success" });
  } catch (e) {
    console.log(e);
  }
});
route.get('/admins',async(req,res)=>{
 try{
   const admin = await User.find({userType: 'admin'});
   res.status(200).send(admin) 
 }catch(e){
   res.status(400).send({message : e.message})
 }
   
})
route.post("/addadmin", upload.single("avatar"), async (req, res) => {
   console.log(req.file);
   console.log(req.body);
   try {
     const user = new User(req.body);
     user.userType = 'admin'
     user.avatar = req.file.buffer;
     await user.save();
     console.log(user);
     res.status(201).send(user);
   } catch (e) {
     console.log(e);
     res.status(400).send({ error: e });
   }
 });
 
route.patch("/updateadmin", upload.single("avatar"), async (req, res) => {
   console.log("Request Body:", req.body);
   console.log("Uploaded File:", req.file);
 
   try {
     const user = await User.findById(req.body._id);
     if (!user) {
       return res.status(404).send({ message: "Người dùng không tồn tại" });
     }
     const updateUser = {};
 
     if (req.file) {
       updateUser.avatar = req.file.buffer;
     }
     const permittedUpdates = [
       "name",
       "birthdate",
       "email",
       "userType",
       "password",
       "phoneNumber",
     ];
 
     Object.keys(req.body).forEach((key) => {
       if (permittedUpdates.includes(key)) {
         // Xử lý trường hợp password rỗng thì không cập nhật
         if (key === "password" && req.body[key] === "") return;
         updateUser[key] = req.body[key];
       }
     });
 
     if (Object.keys(updateUser).length === 0) {
       return res
         .status(400)
         .send({ message: "Không có trường hợp lệ để cập nhật" });
     }
 
     Object.keys(updateUser).forEach((key) => {
       user[key] = updateUser[key];
     });
 
     // Lưu thay đổi
     await user.save();
 
     console.log("Updated User:", user);
     res.status(200).send(user);
   } catch (error) {
     console.error("Error updating user:", error.message);
     res.status(500).send({
       message: "Đã xảy ra lỗi khi cập nhật dữ liệu",
       error: error.message,
     });
   }
 });
 
module.exports = route 