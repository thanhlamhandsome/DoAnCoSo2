const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Load the default image into a buffer
const defaultImagePath = path.join(__dirname, "../../public/imageDefault.jpg");
const defaultImage = fs.existsSync(defaultImagePath)
  ? fs.readFileSync(defaultImagePath)
  : null;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error(" Email is not valid ");
        }
      },
    },
    birthdate: {
      type: Date,
      required: true,
    },
    avatar: {
      type: Buffer,
      default : defaultImage
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: (value) => {
        if (value.includes("password")) {
          throw new Error("Password not includes password ");
        }
      },
    },
    userType: {
      type: String,
      default: "guest",
    },
    balance :{
       type : Number , 
       default :0 
    },
    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    totalPriceCart: {
      type: Number,
      default : 0
    },
    totalQuantityCart: {
      type: Number,
      default : 0
    },
    phoneNumber: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    favouriteGame: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      }
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("transactions", {
  ref: "transsactions",
  localField: "_id",
  foreignField: "userId",
});

userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  } catch (e) {
    return next(e);
  }
  next();
});
userSchema.statics.findByCredentials = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) {
      throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      throw new Error("Password not match");
  }
  return user;
};

userSchema.methods.generarteToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "thanhlam");
  user.tokens.push({ token: token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const objectUser = user.toObject();
  
  delete objectUser.tokens;
  delete objectUser.password;
  delete objectUser.updatedAt;

  return objectUser;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
