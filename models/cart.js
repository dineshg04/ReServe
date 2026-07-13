const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
// Cart Schema
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
    fromrestaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;
