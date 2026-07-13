const mongoose = require('mongoose')

const TokenSchema = mongoose.Schema({
    refreshToken : {
        type : String,
        require : true,
    },
    isValid : {
        type : Boolean,
        default : true,
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    }
})

const Token = mongoose.models.Token || mongoose.model('Token',TokenSchema)

module.exports = Token