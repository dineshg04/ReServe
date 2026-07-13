const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must Provide Restaurant Name'],
    },
    description: {
      type: String,
      required: [true, 'Must Provide Restaurant Description'],
    },
    location: {
      type: String,
      required: [true, 'Must Provide Restaurant Address'],
    },
    imageurl: {
      type: String,
      default: 'no-image',
    },
    pickuptime: {
      type: String,
      required: [true, 'Must Provide Product Pickup time'],
    },
    mobileno: {
      type: Number,
      required: [true, 'Must Provide Phone Number'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Restaurant =
  mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
