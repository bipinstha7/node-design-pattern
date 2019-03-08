const express = require('express')
const router = express.Router()

const { Genre, validate } = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

function asyncMiddleware(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res)
		} catch (error) {
			next(error)
		}
	}
}

router.get(
	'/',
	asyncMiddleware(async (req, res) => {
		const genres = await Genre.find().sort('name')
		res.send(genres)
	})
)

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		const genre = new Genre({ name: req.body.name })
		await genre.save()
		res.send(genre)
	} catch (error) {
		res.status(500).send('Something Failed.')
	}
})

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	try {
		const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

		if (!genre) return res.status(404).send('The genre with the given ID was not found.')

		res.send(genre)
	} catch (error) {
		res.status(500).send('Something Failed.')
	}
})

router.delete('/:id', [auth, admin], async (req, res) => {
	try {
		const genre = await Genre.findByIdAndRemove(req.params.id)

		if (!genre) return res.status(404).send('The genre with the given ID was not found.')

		res.send(genre)
	} catch (error) {
		res.status(500).send('Something Failed.')
	}
})

router.get('/:id', async (req, res) => {
	try {
		const genre = await Genre.findById(req.params.id)

		if (!genre) return res.status(404).send('The genre with the given ID was not found.')

		res.send(genre)
	} catch (error) {
		res.status(500).send('Something Failed.')
	}
})

module.exports = router
