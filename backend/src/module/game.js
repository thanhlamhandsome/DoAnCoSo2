const mongoose = require("mongoose");


  
const gameSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: Buffer,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      validate: function (value) {
        if (this.isPaid && (value === undefined || value <= 0)) {
          return false;
        }
        return true;
      },
    },
    url: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    genre: { // Corrected 'gener' to 'genre'
      type: String,
      required: true
    },
    dislike: {
      type: Number,
      default: 0,
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId
    },
    promoCode: {
      type: Number,
      validate: function (value) {
        if (value && this.price) {
          this.price = this.price-((this.price*value)/100);
          if(value===100){
            this.isPaid= false
          }
          return value > 0 && value <= 100; 
        }
        return true;
      },
    },
}, {
  timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
