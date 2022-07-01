const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema( {  
    name: { type: String, 
		    unique: true,
			required: true,
		    trim: true }, 
	fullName: { type: String, 
		        trim: true,
				required: true,
			    },
	logoLink: { type: String,
	            required: true,
			     },
	isDeleted: {type: Boolean, 
	             default: false},


}, { timestamps: true });


module.exports = mongoose.model('colleges', userSchema)




