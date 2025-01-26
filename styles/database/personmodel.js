const mongoose = require('mongoose')

const personschema= new mongoose.Schema({

    name: {
        type:String,
        required:true


    },

    age: {

        type:Number,

    },

   

    username: {

        type:String,
        required:true,
    },

  
});

const Person = mongoose.model('Person',personschema);
module.exports = Person;