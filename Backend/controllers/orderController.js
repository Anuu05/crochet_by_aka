

//place Order
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate total amount asynchronously
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product not found: ${item.product}` });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add tax charge (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//Get Orders by User ID
export const getUserOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType:'COD'}, {isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1})
        res.json({success:true, orders})
    } catch (error) {
         res.json({success:false, message:error.message})
    }
    
}

//Get All Orders

export const getAllOrders = async (req,res) => {
    try {
    
        const orders = await Order.find({
            userId,
            $or: [{paymentType:'COD'}, {isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1})
        res.json({success:true, orders})
    } catch (error) {
         res.json({success:false, message:error.message})
    }
    
}
