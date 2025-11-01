import Cart from "../model/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from authmiddleware
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        return res.status(400).json({
          status: false,
          message: "Item already in cart",
        });
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        status: true,
        message: "Cart is empty",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
      data: cart.items, // only cart items return 
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    // filter out the product
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Item removed from cart",
      data: cart.items,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // from token

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    // clear all items
    cart.items = [];
    await cart.save();

    res.status(200).json({
      status: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({
        status: false,
        message: "Product ID and quantity are required",
      });
    }

    // find user cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    // find product in cart
    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Product not found in cart",
      });
    }

    // update quantity
    item.quantity = quantity;

    // if quantity <= 0, remove that item
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    }

    await cart.save();

    res.status(200).json({
      status: true,
      message: "Cart updated successfully",
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

