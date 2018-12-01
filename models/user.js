const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	}
})

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(50)
			.required(),
		email: Joi.string()
			.min(3)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(3)
			.max(255) // user sends the plane text which can be hold by 255 character and that plane text will be hashed and store which can be hold by 1024
			.required()
	}

	return Joi.validate(user, schema)
}

const User = mongoose.model('User', userSchema)

module.exports = {
	User,
	validate: validateUser
}
