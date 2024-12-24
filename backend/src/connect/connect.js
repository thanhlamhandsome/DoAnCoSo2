const mongoose = require('mongoose') ; 
mongoose.connect('mongodb://localhost:27017/DoAnCoSo2')
.then(()=>{
    console.log('Connect to Server Succesfully ')
})
.catch((e)=>{
    console.log('Connect to Server Faily')
})