const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

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

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
	return token
}

function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
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
