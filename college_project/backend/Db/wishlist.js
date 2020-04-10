const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user_wishlist = new schema(
    {
        product_id:{type:String,required:true}, 
        email:{type:String,required:true},
        category:{type:String,required:true},
       // cond:{$cond: { if: '', then: true, else: false }}  
    }
);
//wishlist = table name/model name
module.exports = mongoose.model('wishlist',user_wishlist);