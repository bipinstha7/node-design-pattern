const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { User, validate } = require('../models/user')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')

	res.send(user)
})

router.post('/', async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		let user = await User.findOne({ email: req.body.email })

		if (user) return res.status(400).send('User already registered.')

		const { name, email, password, isAdmin } = req.body

		user = new User({
			name,
			email,
			password,
			isAdmin
		})

		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)

		await user.save()

		// generateAuthToken method has been created at user model
		const token = user.generateAuthToken()

		res.header('x-auth-token', token).send({
			_id: user._id,
			name: user.name,
			email: user.email
		})
	} catch (error) {
		res.send(error)
	}
})

module.exports = router
