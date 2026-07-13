const mongoose = require('mongoose');

export const dbConnect = async () => {
    return mongoose.connect(process.env.MONGO_URI);
};
