const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  });
})
.catch(err=>{
  console.log(err);
})
};

exports.getProduct=(req,res,next)=>{
  const proId=req.params.productId
  Product.findAll({where:{id:proId}})
  .then(products=>{
    //  console.log(product[0])
      res.render('shop/product-detail',{
        product:products[0],
        pageTitle:products[0].title,
        path:'/products'
      });
    })
    .catch(err=>console.log(err))

  // Product.findByPk(proId)
  // .then(product=>{
  // //  console.log(product[0])
  //   res.render('shop/product-detail',{
  //     product:product,
  //     pageTitle:product.title,
  //     path:'/products'
  //   });
  // })
  // .catch(err=>console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index',{
      prods:products,
      pageTitle:'Shop',
      path:'/'
  });
})
.catch(err=>{
  console.log(err);
})
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart=(req,res,next)=>{
  const proId=req.body.productId;
  Product.findbyId(proId,(product)=>{
    Cart.addProduct(proId,product.price)
  });
  res.redirect('/');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
