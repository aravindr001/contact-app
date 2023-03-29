const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add the email"]
    },
    phno:{
        type:String,
        required:[true,"Please add the phono"]
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Contact",contactSchema);