const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router()

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	isGold: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
})

const Customer = mongoose.model('Customer', customerSchema)

router.get('/', async (req, res) => {
	try {
		const customers = await Customer.find().sort('name')
		res.send(customers)
	} catch (error) {
		res.send(error)
	}
})

router.post('/', async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		let customer = new Customer({
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		})
		customer = await Customer.save()
		res.send(customer)
	} catch (error) {
		res.send(error)
	}
})

router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
			{ new: true }
		)

		if (!customer) return res.status(404).send('The customer with the given ID was not found.')

		res.send(customer)
	} catch (error) {
		res.send(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const customer = await Customer.findByIdAndRemove(req.params.id)

		if (!customer) return res.status(404).send('The customer with the given ID was not found.')

		res.send(customer)
	} catch (error) {
		res.send(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id)

		if (!customer) return res.status(404).send('The customer with the given ID was not found.')

		res.send(customer)
	} catch (error) {
		res.send(error)
	}
})

function validateCustomer(customer) {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		phone: Joi.string()
			.min(5)
			.max(50)
			.required(),
		isGold: Joi.boolean()
	}

	return Joi.validate(customer, schema)
}

module.exports = router
