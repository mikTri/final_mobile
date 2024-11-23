const { Cart } = require('../models/cart.js');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const cartList = await Cart.find(req.query);
        if (!cartList) {
            res.status(500).json({ success: false })
        }
        return res.status(200).json(cartList);
    } catch (error) {
        res.status(500).json({ success: false })
    }
});

//Lay gio hang theo UserID
router.get(`/:userId`, async (req, res) => {
    const { userId } = req.params;

  try {
    // Tìm kiếm giỏ hàng của người dùng
    let cartItems = await Cart.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng cho người dùng
      const newCart = new Cart({
        userId,
        cartItems: [],
      });

      await newCart.save(); // Lưu giỏ hàng mới
      return res.status(200).json({
        success: true,
        message: "No cart found, created a new empty cart.",
        cartItems: [],
      });
    }

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});

//Add 
router.post('/add', async (req, res) => {
    try {
        const cartItem = await Cart.findOne({ productId: req.body.productId, userId: req.body.userId });

        if (cartItem) {
            // Nếu item đã tồn tại, tăng số lượng và cập nhật subTotal
            cartItem.quantity += req.body.quantity;
            cartItem.subTotal = cartItem.price * cartItem.quantity;
            await cartItem.save();
            return res.status(200).json(cartItem);
        } else {
            // Nếu item chưa tồn tại, thêm item mới vào giỏ hàng
            let cartList = new Cart({
                productTitle: req.body.productTitle,
                image: req.body.image,
                price: req.body.price,
                quantity: req.body.quantity,
                subTotal: price * quantity,
                productId: req.body.productId,
                userId: req.body.userId
            });

            if (!cartList) {
                return res.status(500).json({
                    error: 'Could not create cart item',
                    success: false
                });
            }

            cartList = await cartList.save();
            return res.status(201).json(cartList);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            success: false
        });
    }
});

router.delete('/:id', async (req, res) => {

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
        return res.status(404).json({ msg: "The cart item given id is not found!" })
    }

    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        res.status(404).json({
            message: 'Cart item not found!',
            success: false
        })
    }

    res.status(200).json({
        success: true,
        message: 'Cart Item Deleted!'
    })
});

router.get('/:id', async (req, res) => {

    const catrItem = await Cart.findById(req.params.id);

    if (!catrItem) {
        res.status(500).json({ message: 'The cart item with the given ID was not found.' })
    }
    return res.status(200).send(catrItem);
})

router.put('/:id', async (req, res) => {

    const cartList = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            productTitle: req.body.productTitle,
            image: req.body.image,
            // rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId
        },
        { new: true }
    )

    if (!cartList) {
        return res.status(500).json({
            message: 'Cart item cannot be updated!',
            success: false
        })
    }

    res.send(cartList);

})


module.exports = router;