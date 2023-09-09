const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class cart {
  static addProduct(id, productprice) {
    fs.readFile(p, (err, filecontent) => {
      let cart = {
        products: [],
        totalprice: 0,
      };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      const existingproductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingproduct = cart.products[existingproductIndex];
      let updatedproduct;
      if (existingproduct) {
        updatedproduct = { ...existingproduct };
        updatedproduct.qty = existingproduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingproductIndex] = updatedproduct;
      } else {
        updatedproduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedproduct];
      }
      cart.totalprice = cart.totalprice + +productprice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(id,productprice){
    fs.readFile(p,(err,filecontent)=>{
        if(err){
            return;
        }
        const updatedCart={...JSON.parse(filecontent)};
        const product=updatedCart.products.find(prod=>prod.id===id)
        if (!product) {
            return;
          }
        const ProductQuantity=product.qty;
        updatedCart.products=updatedCart.products.filter(prod=>prod.id!==id);
        updatedCart.totalprice=updatedCart.totalprice-(productprice*ProductQuantity);
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
            console.log(err);
          });
    })
  }
};
