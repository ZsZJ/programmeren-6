const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true
	},
	_links: {
		self: {href: String},
		collection: {href: String}
	}
})

// Export the Artist model
let Artist = module.exports = mongoose.model('Artist', artistSchema)

module.exports.get = function (callback, limit) {
	Artist.find(callback).limit(limit).lean()
}