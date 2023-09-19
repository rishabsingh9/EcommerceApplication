const path = require('path');
var cors=require('cors');
const User=require('./models/user')

const express = require('express');
const bodyParser = require('body-parser');

const sequelize=require('./util/database')


const errorController = require('./controllers/error');

const app = express();

app.use(express.json());

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoute=require('./routes/user');
const expenseRoutes=require('./routes/expense');
const Product = require('./models/product');
const Comment=require('./models/comments');
const Cart = require('./models/cart');
const Post=require('./models/post')
const CartItem= require('./models/cart-item');
const PostRoutes=require('./routes/post');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req,res,next)=>{
//     User.findByPk(1)
//     .then(user=>{
//         req.user=user;
//         next();
//     })
//     .catch(err=>console.log(err));
// })

app.use('/admin', adminRoutes);
//app.use( adminRoutes);
app.use(shopRoutes);
app.use(userRoute);
app.use(expenseRoutes);
app.use(PostRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

Comment.belongsTo(Post);
Post.hasMany(Comment);

sequelize
//.sync({force:true})
.sync()
.then(result=>{
   //return User.findByPk(1)
   app.listen(3000);
})
// .then(user=>{
//     if(!user){
//         return User.create({name:'max',email:'test@gmail.com'})
//     }
//     return user;
// })
// .then(user=>{
//    return user.createCart();
// })
// .then(cart=>{
//     app.listen(3000);
// })
.catch(err=>console.log(err));
