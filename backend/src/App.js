const express = require('express'); 
require('../src/connect/connect.js');
require("dotenv").config();
const app = express(); 
const userRouter = require('../src/route/userRoute.js');
const gameRoute = require('../src/route/gameRoute.js'); 
const transactionRoute  = require('./route/transactionRoute.js'); 

const cors = require('cors'); 
const passportStrategy = require("./passport");
const cookieSession = require('cookie-session'); 
const passport = require('passport'); 
const adminRoute = require('./route/adminRoute.js'); 
const authRoute = require('./route/auth.js')
// app.use(
//     cookieSession({
//         name : "session", 
//         keys:["cycberwolve"],
//         maxAge:24*60*60*100,
//     })
// )

// app.use(passport.initialize()); 
// app.use(passport.session()) ; 

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

app.use("/auth", authRoute);


app.use(cors());

const PORT  = 3000 ; 
app.use(express.json());
app.use('/',userRouter);
app.use('/',adminRoute);
app.use('/',gameRoute) ; 
app.use('/',transactionRoute)
app.listen(PORT,()=>{
    console.log(`Server start at port ${PORT} `)
})