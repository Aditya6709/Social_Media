const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://Aditya1234:Aditya1234@cluster0.5ka4u.mongodb.net/'
mongoose.connect(mongoURL,{
   // useNewURLParser:true,
   // useUnifiedTopology :true
})
const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDB ')
});
db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
});


 

module.exports=db;