const mongoose = require('mongoose');
const schema = mongoose.Schema;
const travel = new schema(
    {
        name:{type:String,required:true},
        category:{type:String,required:true},
        price:{type:String,required:true},
        writer:{type:String,required:true},   
        edition:{type:String,required:true},
        published_year:{type:String,required:true},
        current_price:{type:String,required:true},
        image:{type:String,required:true},
       // category:{type:String,required:true,unique:true},
    }
);
//travel_books = table name/model name
module.exports = mongoose.model('travel_books',travel);