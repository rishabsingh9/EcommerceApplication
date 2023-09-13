const Expense=require('../models/expense');
exports.postAddExpense= async (req,res,next)=>{
    try{
    const amount=req.body.amount;
      const description =req.body.description;
      const category=req.body.category;
      const data= await Expense.create({
          amount:amount,
          description:description,
          category:category
      })
        res.status(201).json({newExpense:data});
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
}

exports.getExpenses=async(req,res,next)=>{
    try{
      const data=await User.findAll();
      res.status(200).json({dt:data});
    }
    catch(err){
        res.status(500).json({
            error:err
        })  
    }
}

exports.deleteExpense=async(req,res,next)=>{
    const userId = req.params.id;
  console.log(userId);
  
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.destroy();
    console.log('User deleted');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
exports.postEditExpense=(req,res,next)=>{
    const proId=req.params.id;
    const updatedExpense = req.body.expense;
      const updatedDescription = req.body.description;
      const updatedCategory = req.body.category;
      //const updatedProduct=new Product(proId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice)
      Product.findByPk(proId)
      .then(product=>{
        product.expense=updatedExpense
        product.description=updatedDescription
        product.category=updatedCategory
        return product.save();
      })
      .then(result=>{
        console.log("Updated Product")
      })
      .catch(err=>{
        console.log(err);
      })
    }
    