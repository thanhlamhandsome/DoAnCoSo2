const express = require("express");
const sharp = require("sharp");
const multer = require("multer");
const auth = require('../util/auth')
const route = express.Router();
const Game = require("../module/game");
const fs = require('fs');
const update = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("You must upload image valid"));
    }
    cb(undefined, true);
  },
});
route.delete('/game',async(req,res)=>{
  const game =await Game.findByIdAndDelete(req.body._id); 
  if(!game){
    res.status(400).send({messga : "Game not found"}); 
  }
  res.status(200).send({messga: "Deleta success"});
})
route.post("/games", update.single("image"), async (req, res) => {
  try {
    console.log(req.file)
    const game = new Game(req.body);
    game.image = req.file.buffer;
    await game.save();
    console.log(game);
    res.status(201).send(game);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
route.post("/developer",auth ,update.single("image"), async (req, res) => {
  try {
    const user = req.user ; 
    console.log(req.file)
    const game = new Game(req.body);
    game.owner = user._id
    game.image = req.file.buffer;
    await game.save();
    console.log(game);
    res.status(201).send({messaga: "Thank you for your donation"});
  } catch (e) {
    console.log(e);
    res.status(201).send({messaga: "Upload your game failed"});
  }
});
route.get("/games/:id/image", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.set("Content-Type", "image/gif");
    res.status(200).send(game.image);
  } catch (e) {
    res.status(400).send(e);
  }
});
route.patch('/games/:id/like',async(req,res)=>{
try{
  
  const game = await Game.findById(req.params.id); 
  game.like += 1 ; 
  await game.save(); 
  res.status(200).send('Succes')
}catch(e){
  console.log(e)
}
})
route.patch('/games/:id/like',async(req,res)=>{
  try{
    console.log(req.body)
    const game = await Game.findById(req.params.id); 
    game.like += 1 ; 
    
    await game.save(); 

    res.status(200).send('Succes')
  }catch(e){
    console.log(e)
  }
  })
  route.patch('/games/:id/cancellike',async(req,res)=>{
    try{
      
      const game = await Game.findById(req.params.id); 
      game.like -= 1 ; 
      
      await game.save(); 
      console.log(game)
      res.status(200).send('Succes')
    }catch(e){
      console.log(e)
    }
    })
  
    
route.patch('/games/:id/dislike',async(req,res)=>{
  try{

    const game = await Game.findById(req.params.id); 
    game.dislike += 1 ; 
    
    await game.save(); 
    console.log(game)
    res.status(200).send('Succes')
  }catch(e){
    console.log(e)
  }
  })
  route.patch('/games/:id/canceldislike',async(req,res)=>{
    try{
      console.log(req.body)
      const game = await Game.findById(req.params.id); 
      game.dislike -= 1 ; 
      
      await game.save(); 
      console.log(game)
      res.status(200).send('Succes')
    }catch(e){
      console.log(e)
    }
    })
  
route.get('/', async (req, res) => {
  try {
    const games = await Game.aggregate([
      { $sample: { size: 10 } }, // Lấy 10 phần tử ngẫu nhiên
      { $project: { image: 0 } } // Loại bỏ trường 'image'
    ]);

    res.status(200).send(games);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

route.get('/store',async (req,res)=>{
 try{
  const games = await Game.find({}); 
  res.status(200).send(games);
 }catch(e){
  res.status(400).send(e)
 }
  
})
route.patch('/updategame',update.single('image'),async(req,res)=>{
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  delete (req.body.image)
  try {
    const game = await Game.findById(req.body._id);
    if (!game) {
      return res.status(404).send({ message: "Người dùng không tồn tại" });
    }
    const updateGame = {};


    if (req.file) {
      updateGame.image = req.file.buffer;
    }
    const permittedUpdates = ["name", "description", "image", "isPaid", "price","url",'genre',"promoCode"];

    // Duyệt qua các trường trong req.body và chỉ cập nhật nếu hợp lệ
    Object.keys(req.body).forEach((key) => {
      if (permittedUpdates.includes(key)) {
        // Xử lý trường hợp password rỗng thì không cập nhật
        if (key === "password" && req.body[key] === "") return;
        updateGame[key] = req.body[key];
      }
    });

    // Kiểm tra nếu không có trường nào được cập nhật
    if (Object.keys(updateGame).length === 0) {
      return res.status(400).send({ message: "Không có trường hợp lệ để cập nhật" });
    }

   
    Object.keys(updateGame).forEach((key) => {
      game[key] = updateGame[key];
    }); 
 

    // Lưu thay đổi
    await game.save();

    // Trả về phản hồi thành công
    console.log("Updated User:", game);
    res.status(200).send(game);
  } catch (error) {
    console.error("Error updating game:", error.message);
    res.status(500).send({ message: "Đã xảy ra lỗi khi cập nhật dữ liệu", error: error.message });
  }
})

route.get('/games/:gameId',async(req,res)=>{
  try{
    const game = await Game.findById(req.params.gameId); 
    res.status(200).send(game);
  }catch(e){
    res.status(400).send(e)
  }
})

module.exports = route;
