const mongoose = require('mongoose');
const schema = mongoose.Schema;
const health_fitness = new schema(
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
//biographies_books = table name/model name
module.exports = mongoose.model('health_fitness_books',health_fitness);