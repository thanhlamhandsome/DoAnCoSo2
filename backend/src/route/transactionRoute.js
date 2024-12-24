const express = require("express");
const route = express.Router();
const auth = require("../util/auth");
const Transaction = require("../module/transaction");
const Game = require("../module/game");
const multer = require('multer'); 
const User = require('../module/user');
const upload = multer({
  fileFilter : (req,file,cb)=>{
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      cb(new Error("You must upload image valid"));
    } 
    cb(undefined,true)
  }
})
route.post("/transaction",upload.single('image') ,auth, async (req, res) => {
  try {
    const user = req.user;
    console.log(req.body)
    if(req.file){
       let items =JSON.parse(req.body.items);
       console.log(items)
       items =items.map((item)=>{
        return item.id||item._id
      })
      console.log(items)
      const transaction = new Transaction();
      transaction.totalPrice = req.body.totalPrice ; 
      transaction.paymentMethod = "transfer" ;
      transaction.gameId = items
      transaction.imageTranfer = req.file.buffer ; 
      transaction.userId = user._id;
      const transactionDate = new Date();
      transaction.transactionDate = transactionDate;
      await transaction.save();
      console.log(transaction);
    }else if(req.body.paymentMethod === 'balance'){
      const transaction = new Transaction(req.body);
      transaction.userId = user._id;
      const transactionDate = new Date();
      transaction.transactionDate = transactionDate;
      user.balance = user.balance - transaction.totalPrice
      await transaction.save();
      console.log(transaction)
      
    }else{
    const transaction = new Transaction(req.body);
    transaction.userId = user._id;
    const transactionDate = new Date();
    transaction.transactionDate = transactionDate;
    await transaction.save();
    console.log(transaction)
    }
    user.totalPriceCart = 0;
    user.totalQuantityCart = 0;
    user.carts = [];
    
    await user.save();
    
    res.status(200).send({ message: "You've made a successful payment" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "You've made a Failed payment" });
  }
});

route.get("/alltransaction", async (req, res) => {
  try {
  
    const transactions = await Transaction.find({});

 
    const updatedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
       
        const games = await Promise.all(
          transaction.gameId.map(async (id) => {
            const game = await Game.findById(id.toString()).select("name");
            return game; 
          })
        );
        
        // Gắn games vào transaction
        return {
          ...transaction.toObject(),
          games, // Thêm mảng games chứa thông tin đã resolve
        };
      })
    );


    res.status(200).send(updatedTransactions);
  } catch (e) {
    console.log(e);
    res.status(400).send("Cannot fetch transactions");
  }
});

route.get("/trasaction", auth, async (req, res) => {
  try {
    const user = req.user;
    const transaction = await Transaction.find({ userId: user._id }).populate({
      path: "gameId",
      select: "name",
    });

    res.status(200).send(transaction);
  } catch (e) {
    console.log(e);
  }
});
route.get('/getPaidGame',auth,async(req,res)=>{
  try{
    const user = req.user ; 
    const transactions =await Transaction.find({userId : user._id,status:'success'});
    let games = [] ; 
    transactions.forEach((transaction)=>{
      transaction.gameId.forEach((gameIdChild)=>{
         games.push(gameIdChild) ; 
      })
    })
    console.log(games)
    res.status(200).send(games); 
  }catch(e){
    console.log(e)
    res.status(400).send(e); 
  }
})
route.patch('/transaction',async(req,res)=>{
  const {_id,status} = req.body
try{
  const transaction = await Transaction.findById(_id); 
  transaction.status = (status); 
  await transaction.save(); 
  console.log(transaction);
  res.status(200).send(transaction); 
}catch(e){
  console.log(e); 
  res.status(400).send(e)
}
})

module.exports = route;
