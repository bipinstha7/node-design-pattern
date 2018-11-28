const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

router.post('/', async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		const { email, password } = req.body
		let user = await User.findOne({ email })

		if (!user) return res.status(400).send('Invalide email or password')

		const validPassword = await bcrypt.compare(password, user.password)

		if (!validPassword) return res.status(400).send('Invalide email or password')

        const token = jwt.sign({_id: user._id}, 'jwtPrivateKeyHere')

		res.send(token)
	} catch (error) {
		res.send(error)
	}
})

function validate(req) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	}

	return Joi.validate(req, schema)
}

module.exports = router
