const { User } = require('../../../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const mongoose = require('mongoose')

describe('user.generateAuthToken', () => {
	it('should return a valid JWT', () => {
		const mongooseId = new mongoose.Types.ObjectId().toHexString()
		const payload = { _id: mongooseId, isAdmin: true }
		const user = new User(payload)

		const token = user.generateAuthToken()
		const decoded = jwt.verify(token, keys.jwtPrivateKey)

		expect(decoded).toMatchObject(payload)
	})
})
