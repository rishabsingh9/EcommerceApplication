const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  })
  .then(result=>{
    console.log('Product created successfully:',result)
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findByPk(proId)
  .then(product=>{
    if(!product){
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode
  })
})
};

exports.postEditProduct=(req,res,next)=>{
const proId=req.body.productId;
const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  //const updatedProduct=new Product(proId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice)
  Product.findByPk(proId)
  .then(product=>{
    product.title=updatedTitle
    product.imageUrl=updatedImageUrl
    product.price=updatedPrice
    product.description=updatedDescription
    return product.save();
  })
  .then(result=>{
    console.log("Updated Product")
    res.redirect('/admin/products')
  })
  .catch(err=>{
    console.log(err);
  })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  });
})
.catch(err=>{
  console.log(err);
})

  // Product.fetchAll()
  // .then(([rows,fieldData])=>{
  //   res.render('shop/product-list',{
  //     prods:rows,
  //     pageTitle:'All Products',
  //     path:'/products'
  //   });
  // })
  // .catch(err=>console.log(err))
};
 exports.postDeleteProduct=(req,res,next)=>{
const proId=req.body.productId;
Product.findByPk(proId)
.then(product=>{
  return product.destroy();
})
.then(result=>{
  console.log("product destroyed successfully");
  res.redirect('/admin/products')
})
.catch(err=>{
  console.log(err);
})
 }