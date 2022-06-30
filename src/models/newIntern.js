

const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: {type: String, required: true },
    email: {type: String, required: true },
    mobile: { type: String, 
              required: true,
                },
    CollegeId: { type: objectId,
                  ref: "colleges",
                  required: true },
    isDeleted: {type: Boolean, default: false}

}, { timestamps: true });


module.exports = mongoose.model("newIntern", bookSchema) //users
