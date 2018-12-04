let router = require('express').Router()

router.get('/', function(req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome to the Artist API'
    })
})

// Import Artist Controller
const artistController = require('./controllers/artistController')

// Artist Routes
router.route('/artists')
    .options(artistController.collectionOptions)
    .get(artistController.index)
    .post(artistController.new)

router.route('/artists/:artist_id')
    .options(artistController.detailOptions)
    .get(artistController.view)
    .put(artistController.update)
    .delete(artistController.delete)

module.exports = router