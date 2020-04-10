const express = require('express');
const router = express.Router();
const add_books_category = require("../Db/Addbookscategory");
const science = require("../Db/books_category/science");
const history = require("../Db/books_category/history");
const action_adventure = require("../Db/books_category/action and adventure");
const biographies = require("../Db/books_category/biographies");
const children = require("../Db/books_category/children");
const drama_comics = require("../Db/books_category/drama and comics");
const horror = require("../Db/books_category/horror");
const math = require("../Db/books_category/math");
const poetry = require("../Db/books_category/poetry");
const tech = require("../Db/books_category/tech");
const travel = require("../Db/books_category/travel");
const business = require("../Db/books_category/business");
const sports = require("../Db/books_category/sports");
const health_fitness = require("../Db/books_category/health and fitness");
const user_account = require("../Db/user_account");
const user_cart = require("../Db/cart");
const user_wishlist = require("../Db/wishlist");
const user_order=require("../Db/order");
const multer = require('multer');
var nodemailer = require('nodemailer');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let DIR="./server_images";


/*Code block for muler for image uploading of a books*/
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
 let upload = multer({ storage: storage }).single('Image');

/*Code block for node mailer host */

//nodemailer send email host details
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohmadsabban123@gmail.com',
    pass: 'fhrrlzaxrdemfsme'//app password
  }
});

// this code is for verify a user
//middlewere function to check token is null or not
function verfytoken(req,res,next)
{
    let temptoken = req.body.token
    if(temptoken !=="null")
    {
      req.token = temptoken;
      //call middlewere
      next();
    }
    else
    {
        res.json({'errr':1,'u dont have token':1})
    }
}
/*========This api route is for save a category in database */
router.post('/api/addbookscategory',function(req,res)
{
    const category = req.body.addcategory;
    let ins =  new add_books_category({'category':category}); // to save value in data base it save dynamically create new schema 
    // inside this theri is two value
ins.save(function(err)
{
if(err)
{
res.json({'err':1,'msg':'some error'})
}
else{
res.json({'err':0,'msg':'save'})
}
})  
});
/*=================this route is for fatch a category==================== */
router.get('/api/getcategory',function(req,res)
{ 
    add_books_category.find({},function(err,data)
{
    if(err)
    {
        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
    }
    else
    {
        res.json({'err':0,'data':data})
    }
})
});
/*============This route is for delete a category========================== */
router.post('/api/delete_category',function(req,res)
{
    const delete_cat_name = req.body.delete_cat;
    add_books_category.deleteOne({'category':delete_cat_name},function(err)
   {
        if(err)
        {
            res.json({'err':1,'msg':'already delete'})
        }
        else{
            res.json({'err':0,'msg':'delete'})
             }
   })
});
/* this route is for save books according to category wise*/
router.post('/api/new_books_save',function(req,res)
{
    upload(req,res, function(err)
        {
            if(err){
                res.json({'err':err})
            }
            else
            {
                let name = req.body.name;
                let Category  = req.body.Category;
                let Price = req.body.Price;
                let Writer = req.body.Writer;
                let Edition = req.body.Edition;
                let Published_year = req.body.Published_year;
                let current_Price = req.body.current_Price;
              let Image=req.file.filename;
             
              switch(Category)
              {
                  case "science":
                           // to save value in data base it save dynamically create new schema 
                           // inside this theri is two value
                          let ins =  new science(
                          {'name':name,'category':Category,'price':Price,'writer':Writer,
                          'edition':Edition,'published_year':Published_year,
                          'current_price':current_Price,'image':Image
                          });
                              ins.save(function(err)
                              {
                              if(err)
                              {
                              res.json({'err':1,'msg':'some error'});
                              }
                              else{
                              res.json({'err':0,'msg':'save','cat':'science'});
                              }
                              }) 
                          break;
          
          
                  case "math":
                    let math_books =  new math(
                        {'name':name,'category':Category,'price':Price,'writer':Writer,
                        'edition':Edition,'published_year':Published_year,
                        'current_price':current_Price,'image':Image
                        });
                            math_books.save(function(err)
                            {
                            if(err)
                            {
                            res.json({'err':1,'msg':'some error'});
                            }
                            else{
                            res.json({'err':0,'msg':'save','cat':'science'});
                            }
                            }) 
                        break;
          
          
                   case "drama and comics":
                          let drama_comics_books =  new drama_comics(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      drama_comics_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'drama and comics'});
                                      }
                                      }) 
                          break; 
          
                   case "action and adventure":
                          let action_adventure_books =  new action_adventure(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      action_adventure_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'action and adventure'});
                                      }
                                      }) 
                          break;  
                          
                          
                   case "horror":
                          let horror_books =  new horror(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      horror_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'horror'});
                                      }
                                      }) 
                          break; 
          
          
                  case "travel":
                          let travel_books =  new travel(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      travel_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'travel'});
                                      }
                                      }) 
                          break;
                          
                          
                  case "children":
                          let children_books =  new children(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      children_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'children'});
                                      }
                                      }) 
                          break;
          
          
                   case "biographies":
                          let biographies_books =  new biographies(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      biographies_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'Biographies'});
                                      }
                                      }) 
                          break; 
          
                  case "history":
                          let history_books =  new history(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      history_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'history'});
                                      }
                                      }) 
                          break; 
          
          
          
          
                  case "business":
                          let business_books =  new business(
                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                            'edition':Edition,'published_year':Published_year,
                            'current_price':current_Price,'image':Image
                            });
                                      business_books.save(function(err)
                                      {
                                      if(err)
                                      {
                                      res.json({'err':1,'msg':'some error'});
                                      }
                                      else{
                                      res.json({'err':0,'msg':'save','cat':'business'});
                                      }
                                      }) 
                          break;  
          
          
                  case "tech":
                                  let tech_books =  new tech(
                                    {'name':name,'category':Category,'price':Price,'writer':Writer,
                                    'edition':Edition,'published_year':Published_year,
                                    'current_price':current_Price,'image':Image
                                    });
                                              tech_books.save(function(err)
                                              {
                                              if(err)
                                              {
                                              res.json({'err':1,'msg':'some error'});
                                              }
                                              else{
                                              res.json({'err':0,'msg':'save','cat':'tech'});
                                              }
                                              }) 
                          break;
          
          
                  case "sports":
                                  let sports_books =  new sports(
                                    {'name':name,'category':Category,'price':Price,'writer':Writer,
                                    'edition':Edition,'published_year':Published_year,
                                    'current_price':current_Price,'image':Image
                                    });
                                              sports_books.save(function(err)
                                              {
                                              if(err)
                                              {
                                              res.json({'err':1,'msg':'some error'});
                                              }
                                              else{
                                              res.json({'err':0,'msg':'save','cat':'sports'});
                                              }
                                              }) 
                          break; 
          
                          case "health and fitness":
                                  let health_fitness_books =  new health_fitness(
                                    {'name':name,'category':Category,'price':Price,'writer':Writer,
                                    'edition':Edition,'published_year':Published_year,
                                    'current_price':current_Price,'image':Image
                                    });
                                              health_fitness_books.save(function(err)
                                              {
                                              if(err)
                                              {
                                              res.json({'err':1,'msg':'some error'});
                                              }
                                              else{
                                              res.json({'err':0,'msg':'save','cat':'health and fitness'});
                                              }
                                              }) 
                          break;  
          
                          case "poetry":
                                          let poetry_books =  new poetry(
                                            {'name':name,'category':Category,'price':Price,'writer':Writer,
                                            'edition':Edition,'published_year':Published_year,
                                            'current_price':current_Price,'image':Image
                                            });
                                                      poetry_books.save(function(err)
                                                      {
                                                      if(err)
                                                      {
                                                      res.json({'err':1,'msg':'some error'});
                                                      }
                                                      else{
                                                      res.json({'err':0,'msg':'save','cat':'poetry'});
                                                      }
                                                      }) 
                          break;     
                  
          
                  default :
                  res.json({'err':1,'category':"cat not find"});        
              }
            }
      });
    });
/*This route is for to get books details */
router.get('/api/get_books_details/:data',function(req,res)
{
        const cat_name = req.params.data;
        console.log(cat_name)
        switch(cat_name)
        {
                case "science":
                                science.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;


                case "math":
                                math.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "action and adventure":
                                action_adventure.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;
                case "biographies":
                                biographies.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "business":
                                business.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;
                
                case "children":
                                children.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "drama and comics":
                                drama_comics.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "health and fitness":
                                health_fitness.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "history":
                                history.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "horror":
                                horror.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "poetry":
                                poetry.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                case "sports":
                                sports.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;
                
                case "tech":
                                tech.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;
                case "travel":
                                travel.find({},function(err,data)
                                {
                                    if(err)
                                    {
                                        res.json({'err':1,"data":"seome erroe is occur to fatch category"})
                                    }
                                    else
                                    {
                                        res.json({'err':0,'data':data})
                                    }
                                })
                break;

                default:
               res.json({'err':1,'msg':'category not found in database or in switch case'})
        }
});

/*This route is for delete a books */
router.get('/api/delete_books_details/:id/:cat',function(req,res)
{
    const Id = req.params.id;
    const category = req.params.cat;
    switch(category)
    {
        case 'science':
                science.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;
        
        case 'action and adventure':
                action_adventure.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;
               
         case 'biographies':
                biographies.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;          

         case 'business':
                business.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;  
                
         case 'children':
                children.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;  
                
        case 'drama_comiscs':
                drama_comics.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;        
                
         case 'health_fitness':
                health_fitness.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;   
                
         case 'history':
                history.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;          

                
         case 'horror':
                horror.deleteOne({'_id':Id},function(err)
                {
                     if(err){
                        res.json({'err':1})
                     }
                     else{
                         res.json({'err':0,'msg':'delete'})
                     }
                });
                break;      
        
                case 'math':
                        math.deleteOne({'_id':Id},function(err)
                        {
                             if(err){
                                res.json({'err':1})
                             }
                             else{
                                 res.json({'err':0,'msg':'delete'})
                             }
                        });
                        break;  
                        
                
                case 'poetry':
                        poetry.deleteOne({'_id':Id},function(err)
                        {
                             if(err){
                                res.json({'err':1})
                             }
                             else{
                                 res.json({'err':0,'msg':'delete'})
                             }
                        });
                        break;     
                        
                case 'sports':
                        sports.deleteOne({'_id':Id},function(err)
                        {
                             if(err){
                                res.json({'err':1})
                             }
                             else{
                                 res.json({'err':0,'msg':'delete'})
                             }
                        });
                        break;             

                 case 'tech':
                        tech.deleteOne({'_id':Id},function(err)
                        {
                             if(err){
                                res.json({'err':1})
                             }
                             else{
                                 res.json({'err':0,'msg':'delete'})
                             }
                        });
                        break;
                   
                        case 'travel':
                                travel.deleteOne({'_id':Id},function(err)
                                {
                                     if(err){
                                        res.json({'err':1})
                                     }
                                     else{
                                         res.json({'err':0,'msg':'delete'})
                                     }
                                });
                                break;


        default:
            res.json({'err':1,'msg':'cat not find'})        
    }
  
});

/*This route is for verify email sending mail */
router.post('/api/create_user',function(req,res)
{
   const uemail = req.body.email;
    //otp gernate function
        const temp = function()
        { 
            var digits = '0123456789'; 
            let OTP = ''; 
            for (let i = 0; i < 6; i++ ) { 
              OTP += digits[Math.floor(Math.random() * 10)]; 
                    } 
                return OTP; 
            }
const pin = temp();
//Otp gernate function end


   //function for send a mail;
   var mailOptions = {
    from: 'mohmadsabban123@gmail.com',
    to: uemail,
    subject: 'Books_Store.com',
    text: `your otp is${pin}`,
    html: `<div style="width:40%,height:40%,border:2px solid black">
    <h1>Your OTP</h1>${pin}</div>`
     };
  //sendmail function call
  transporter.sendMail(mailOptions, function(error, info){
    if (error)
     {
      res.json({'err':1,'email':'not a valid email'})
    } 
    else
     {
      res.json({'err':0,'email':'mailsend','pin':pin})
    }
  });
});

/*THis is jwt route and save data */
router.post('/api/auth_user',function(req,res)
{
    const uname = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact  = req.body.contact;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const state = req.body.state;
    const pass = bcrypt.hashSync(password, 10);
    const utoken = {'email':email,'name':uname,'password':pass};
    let user =  new user_account(
        {'name':uname,'email':email,'password':pass,
        'contact':contact,'address':address,'pincode':pincode,
        'state':state
        });
            user.save(function(err)
            {
            if(err)
            {
            res.json({'err':'db','msg':'some error'});
            }

            else
            {
                jwt.sign({utoken},'secretkey',function(err,token)
                {
                    if(err)
                    {
                        res.json({'err':'jwt','msg':'jwt'})
                    }
                    else
                    {
                        // token send to angular server
                        res.json({'token':token,'email':email})
                    }
                })
            }
            })
})

/*=====THis route is for showing a best seller books in front end */
router.get('/api/best_seller',function(req,res)
{
    science.find({},function(err,data)
    {
        if(err)
        {
            res.json({'err':1,"data":"seome erroe is occur to fatch category"})
        }
        else
        {
            res.json({'err':0,'data':data})
        }
    });
});

/*This route is for login */
router.post('/api/login',function(req,res)
{
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;
    user_account.findOne({'email':email,'contact':contact},function(err,data)
    {
        /*When email and contact not found in database it give not found error */
        if(err)
        {
            res.json({'err':'404',"data":"Account not found"})
        }
        else if(data==null)
        {
            res.json({'err':'404','msg':'account not found'});
        }

        /*When email and contact found then compair password */
        else
        {
           bcrypt.compare(password,data.password,function(err,pdata)
           {

            /*Utoken is for gernating a token data object is come when email and contact match */
            const utoken ={'email':data.email,'name':data.name,'password':data.password};

               /*Return false when password not match */
               if(pdata==false)
               {
                   res.json({'err':'notmatch','msg':'not match'});
               }
               /*Return true when password match and now we send a token */
               else
               {
                jwt.sign({utoken},'secretkey',function(err,token)
                {
                    if(err)
                    {
                        res.json({'err':'jwt','msg':'jwt'})
                    }
                    else
                    {
                        // token send to angular server
                        res.json({'token':token,'email':email});
                    }
                })
            
               }
           })
        }
    });
});

/*This route is for to check mail and send otp */
router.post('/api/forget_pass',function(req,res)
{
   let mail = req.body.email;
  
   user_account.findOne({'email':mail},function(err,data)
   {
       if(err)
       {
           res.json({'err':'404','msg':'account not found'})
       }
       else if(data==null)
       {
        res.json({'err':'404','msg':'account not found'})
       }
       else
       {
        
        //otp gernate function
            const temp = function()
            { 
                var digits = '0123456789'; 
                let OTP = ''; 
                for (let i = 0; i < 6; i++ ) { 
                  OTP += digits[Math.floor(Math.random() * 10)]; 
                        } 
                    return OTP; 
                }
    const pin = temp();
    //Otp gernate function end
    
    
       //function for send a mail;
       var mailOptions = {
        from: 'mohmadsabban123@gmail.com',
        to: mail,
        subject: 'Books_Store.com',
        text: `your otp is${pin}`,
        html: `<div style="width:40%,height:40%,border:2px solid black">
        <h1>Your OTP</h1>${pin}</div>`
         };
      //sendmail function call
      transporter.sendMail(mailOptions, function(error, info){
        if (error)
         {
          res.json({'err':'404','email':'not a valid email'})
        } 
        else
         {
          res.json({'err':0,'email':mail,'pin':pin})
        }
      });
       }
   })
  
});

/*This route is for set new password */
router.post('/api/update_password',function(req,res)
{
    const email = req.body.email;
    const password = req.body.password;
    const pass = bcrypt.hashSync(password, 10);
    user_account.updateOne({'email':email},{$set:{'password':pass}},function(err,data)
    {
        if(err)
        {
            res.json({'err':'404'})
        }
        else if(data.ok==0)
        {
            res.json({'err':'404'});
        }

        else
        {
            res.json({'err':0})
        }
    })
});


/*This route is for save cart item */
router.post('/api/cart_data',verfytoken, function(req,res)
{
    const name = req.body.name;
    const image = req.body.image;
    const writer = req.body.writer;
    const price = req.body.price;
    const email = req.body.email;
    const category = req.body.category;
    jwt.verify(req.token ,'secretkey' ,function(err)
    {
            if(err)
            {
                res.json({'err':'token_error'})
            }
            else
            {
                let cart =  new user_cart(
                    {'email':email,'name':name,"current_price":price,'image':image,'writer':writer,'category':category});

                 cart.save(function(err,data)
                 {
                    if(data==null)
                    {
                        res.json({'err':1,'msg':'connection error'});
                    }
                    else{
                        res.json({'err':0,'msg':'add'})
                    }
                 })   
            }

    })     
});

/*This route is for save wishlist item */
router.post('/api/wishlist_data',verfytoken,function(req,res)
{
    const id = req.body.id;
    const email = req.body.email;
    const category = req.body.category;
    jwt.verify(req.token ,'secretkey' ,function(err)
    {
            if(err)
            {
                res.json({'err':'token_error'})
            }
            else
            {
                let wishlist =  new user_wishlist(
                    {'email':email,'product_id':id,'category':category});

                 wishlist.save(function(err,data)
                 {
                    if(err)
                    {
                        res.json({'err':1,'msg':'connection error'});
                    }
                    else{
                        res.json({'err':0,'data':data})
                    }
                 })   
            }
    })     
});


/*THis route is for fetch wishlist item */
router.get('/api/fetch_wishlist/:email/:category',function(req,res)
{
    const email = req.params.email;
    const cat = req.params.category;

    user_wishlist.find({'email':email},function(err,data)
    {
        if(err)
        {
            res.json({'err':'item','msg':'something wrong'});
        }
        else if(data==null)
        {
            res.json({'err':'item','msg':'no item found'});
        }

        else
        {
            let id = [];
        data.forEach(c => 
            {
                id.push(c.product_id)
        });

        switch(cat)
        {
            case 'science':
            science.find({'_id':id},function(err,data)
            {
                if(data.length==0)

                       {
                        res.json({'err':'404','msg':'no books find in your wish list'})
                       }
                       else
                       {
                        res.json({'err':0,'data':data});
                       }
            });
            break;

            case 'action and adventure':
                         action_adventure.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data,'msg':'action'});
                           }
                         })
                         break;

            case 'biographies':
                                biographies.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
        
                       case 'business':
                         science.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break;          
        
                         case 'children':
                                children.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
                      
                         case 'drama and comics':
                         drama_comics.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break;
        
        
                         case 'health and fitness':
                                health_fitness.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
        
                         case 'history':
                         history.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break;
                         
                         
                         case 'horror':
                                horror.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
        
                         case 'math':
                         math.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break; 
                         
                         case 'poetry':
                                poetry.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
        
                         case 'sports':
                         sports.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break;
        
                         case 'tech':
                                tech.find({'_id':id},function(err,data)
                                {
                                  if(data.length==0)
                                  {
                                   res.json({'err':'404','msg':'no books find in your wish list'})
                                  }
                                  else{
                                   res.json({'err':0,'data':data});
                                  }
                                })
                                break;
        
                         case 'travel':
                         travel.find({'_id':id},function(err,data)
                         {
                           if(data.length==0)
                           {
                            res.json({'err':'404','msg':'no books find in your wish list'})
                           }
                           else{
                            res.json({'err':0,'data':data});
                           }
                         })
                         break;        
        
            default:
            res.json({'err':'404','msg':'category not found'});
        }
        }
    });

});

// this route is for fetch cart
router.get('/api/fetch_cart/:email',function(req,res)
{
    const email = req.params.email;
    user_cart.find({'email':email},function(err,data)
    {
     if(data==null)
     {
         res.json({'err':'404'});
     }
     else
     {
        res.json({'err':0,'data':data});
     }
    });
});

// this route is for remove item form cart
router.get('/api/remove_item__user/:id',function(req,res)
{
    const id = req.params.id;
    user_cart.deleteOne({'_id':id},function(err,data)
    {
       if(data==null)
       {
           res.json({'err':'404'})
       }
       else
       {
           res.json({'err':0,'data':data})
       }
    })
});

// this route is for get user info
router.get('/api/user_info/:id',function(req,res)
{
    const id = req.params.id;
    user_account.find({'email':id},function(err,data)
    {
        if(err)
        {
            res.json({'err':1,'data':err});
        }
        else
        {
            res.json({'err':0,'data':data});
        }
    })
})

router.post('/api/order/:email',function(req,res)
{
    const info = req.body.data;
    const total=req.body.total;
    let name=[];
    let price=[];
    let image=[];
    const email = req.params.email;
    info.forEach(c => {
        name.push(c.name);
        price.push(c.current_price);
        image.push(c.image);
    });  
    let order =  new user_order(
        {'email':email,'name':name,'price':price,'image':image,'total':total});

     order.save(function(err,data)
     {
        if(err)
        {
            res.json({'err':'404','msg':err});
        }
        else{
            res.json({'err':0,'data':data})
        }
     })   
});
router.get('/api/fetch_order/:email',function(req,res)
{
    const email=req.params.email;
    user_order.find({'email':email},function(err,data)
    {
        if(err)
        {
            res.json({'err':'404','msg':'something wrong'});
        }
        else if(data==null)
        {
            res.json({'err':'404','msg':'no item found'});
        }
        else
        {
            res.json({'err':0,'data':data});
        } 
    })
})


module.exports = router;