const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 25,
      required: [true, 'Must Provide Name'],
    },
    email: {
      type: String,
      required: [true, 'Must Provide Email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid Email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Must Provide Password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'storeowner'],
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
