const mongoose = require("mongoose");
const transacsionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  gameId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      trim: true,
      required: true,
      
    },
  ],
  totalPrice: {
    type: Number,
    validate: (value) => {
      if (value < 0) {
        throw new Error("totalAmount not valid");
      }
    },
    required: true,
  },
  userNameCart : {
   type : String , 
   trim : true 
  },
  cardNumber : {
    type : String 
  },

  imageTranfer :{
    type : Buffer , 
  },
  status: {
    type: String,
    default : "pending"
  }, //"success", "failed", "pending"
  paymentMethod: {
    type: String,
  }, //"credit card",""bank transfer""
},  {
  timestamps: true, // Tạo tự động trường `createdAt` và `updatedAt`
});
const Transaction = mongoose.model("transactions", transacsionSchema);
module.exports = Transaction;