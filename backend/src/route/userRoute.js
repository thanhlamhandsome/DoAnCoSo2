const express = require("express");
const route = express.Router();
const User = require("../module/user");
const Game = require("../module/game");
const auth = require("../util/auth");
const multer = require("multer");
const sharp = require("sharp");

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

route.post("/signin", async (req, res) => {
  try {
    const user = await User.findByCredentials({
      email: req.body.email,
      password: req.body.password,
    });
    const token = await user.generarteToken();
    res.status(200).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
});

route.post("/adduser", upload.single("avatar"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  try {
    const user = new User(req.body);
    user.avatar = req.file.buffer;
    await user.save();
    console.log(user);
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
});
route.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);

    await user.save();
    console.log(user);
    res.status(200).send({ message: "Sign in success!" });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

route.post("/removefavouritegame", auth, async (req, res) => {
  try {
    const user = req.user;
    const gameId = req.body.id;
    user.favouriteGame = user.favouriteGame.filter((game) => {
      return game.toString() !== gameId;
    });
    const games = await Promise.all(
      user.favouriteGame.map(async (gameId) => {
        const game = await Game.findById(gameId.toString()).select(
          "image  name"
        );
        return game; // Trả về game để Promise.all thu thập
      })
    );
    await user.save();
    res.status(200).send(games);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
route.get("/getfavouritegame", auth, async (req, res) => {
  try {
    const user = req.user;
    const favouriteGames = user.favouriteGame;

    const games = await Promise.all(
      favouriteGames.map(async (gameId) => {
        const game = await Game.findById(gameId.toString()).select(
          "image createdAt name"
        );
        return game; // Trả về game để Promise.all thu thập
      })
    );

    res.status(200).send(games);
  } catch (e) {
    res.send(400).send(e);
    console.log(e);
  }
});

route.post("/addcart", auth, async (req, res) => {
  try {
    console.log(req.body);
    const user = req.user;
    const cartId = req.body.id;
    const cart = await Game.findById(cartId).select("price");
    const exisCart = user.carts.find((cart) => cart.toString() === cartId);
    if (exisCart) {
      return res.status(400).send({ message: "Item already in cart" });
    }
    user.totalQuantityCart += 1;
    user.totalPriceCart += cart.price;
    user.carts.push(cartId);
    await user.save();

    res.status(200).send({ message: "Add cart success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Add cart failed" });
  }
});
route.post("/removecart", auth, async (req, res) => {
  try {
    const user = req.user;
    const removecartId = req.body.id;
    user.carts = user.carts.filter((item) => {
      return item.toString() !== removecartId;
    });
    const cart = await Game.findById(req.body.id).select("price");
    user.totalPriceCart -= cart.price;
    user.totalQuantityCart -= 1;
    await user.save();
    const findCartUser = await User.findById(user.id).populate({
      path: "carts",
      select: "name image  price ",
    });
    res.status(200).send({
      carts: findCartUser.carts,
      totalPrice: findCartUser.totalPriceCart,
      totalQuantity: findCartUser.totalQuantityCart,
    });
  } catch (e) {
    console.log(e);
  }
});
route.get("/myprofile", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
});
route.patch("/setfavouritegame", auth, async (req, res) => {
  try {
    const user = req.user;
    const gameId = req.body.id;
    console.log(req.body);
    if (user.favouriteGame.includes(gameId)) {
      console.log("trung");
      return res.status(400).send({ message: "You've saved this game before" });
    }
    user.favouriteGame.push(gameId);
    await user.save();
    console.log(user.favouriteGame);
    res.status(200).send({ message: "Save game favourit success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Send favourite game fail" });
  }
});
route.post("/loggout", auth, async (req, res) => {
  try {
    const user = req.user;
    const tokenLogout = req.token;
    user.tokens = user.tokens.filter((token) => {
      return token.token !== tokenLogout;
    });
    await user.save();
    res.status(200).send({ message: "Loggout success" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Logout fail" });
  }
});
  route.patch("/updateuser",upload.single('avatar') ,auth, async (req, res) => {
    try {
      const user = req.user;
      console.log(user.avatar)
      const updateUser = req.body;
      console.log(updateUser)
      if(req.file){
        console.log(req.file);
      
        console.log("Received file:", req.file.originalname);
        user.avatar = req.file.buffer
      }
      updateUser.birthdate = new Date(updateUser.birthdate);
      const permitUpdate = [
        "name",
        "birthdate",
        "email",
        "password",
        "avatar", 
        "phoneNumber",
      ];
      const updateKey = Object.keys(updateUser);
      const updateValid = updateKey.every((update) => {
        return permitUpdate.includes(update);
      });
      if (!updateValid) {
        return res.status(400).send({ message: "Dữ liệu không hợp lệ" });
      }
      updateKey.forEach((update) => {
        user[update] = updateUser[update];
      });

      await user.save();
      console.log(user.avatar)
      res.status(200).send({message : "Update success"});
    } catch (e) {
      res.status(400).send({message : "Update failed"});
      console.log(e);
    }
  });
route.patch("/updateuseradmin", upload.single("avatar"), async (req, res) => {
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
      "password",
      "userType",
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

route.get("/carts", auth, async (req, res) => {
  try {
    const user = req.user;
    const findCartUser = await User.findById(user.id).populate({
      path: "carts",
      select: "name image  price ",
    });

    res.status(200).send({
      carts: findCartUser.carts,
      totalPrice: findCartUser.totalPriceCart,
      totalQuantity: findCartUser.totalQuantityCart,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
route.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({ message: "Delete User Success" });
  } catch (e) {
    console.log(e);
  }
});
route.get("/users", async (req, res) => {
  try {
    const users = await User.find({userType: 'guest'});
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
