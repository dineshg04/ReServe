const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must Provide Product name'],
      minlength: 3,
    },
    description: {
      type: String,
      maxlength: 999,
    },
    price: {
      type: Number,
      required: [true, 'Must Provide Price'],
    },
    imageurl: {
      type: String,
      default: 'no-image',
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required : true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
