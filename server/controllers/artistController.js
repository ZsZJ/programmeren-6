// Import Artist Model
Artist = require('../models/artistModel')

// Allow header options on collections
exports.collectionOptions = function(req, res) {
    res.header('Access-Control-Allow-Methods', ['OPTIONS','GET','POST'])
    res.sendStatus(200)
}

// Allow header options on details
exports.detailOptions = function(req, res) {
    res.header('Access-Control-Allow-Methods', ['OPTIONS','GET', 'PUT', 'DELETE'])
    res.sendStatus(200)
}

// List all the artists || GET
exports.index = function(req, res) {
    if(req.accepts('json')) {
        Artist.get(function(error, artists) { 
            
            if(error) {
                res.json({
                    status: "error",
                    message: error
                })
            }

            // Mutate artists in collection to have _links
            for(let i = 0; i < artists.length; i++) {
                artists[i]['_links'] = {}
                artists[i]._links['self'] = { href: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + artists[i]._id}
                artists[i]._links['collection'] = { href: req.protocol + '://' + req.get('host') + req.originalUrl}
            }

            // Response JSON
            res.json({
                items: artists,
                _links: {
                    self: {
                        href: req.protocol + '://' + req.get('host') + req.originalUrl
                    }
                },
                pagination: {
                    currentPage: 1,
                    currentItems: artists.length,
                    totalPages: 1,
                    totalItems: artists.length,
                    _links: {
                        first: {
                            page: 1,
                            href: req.protocol + '://' + req.get('host') + req.originalUrl
                        },
                        last: {
                            page: 1,
                            href: req.protocol + '://' + req.get('host') + req.originalUrl
                        },
                        previous: {
                            page: 1,
                            href: req.protocol + '://' + req.get('host') + req.originalUrl
                        },
                        next: {
                            page: 1,
                            href: req.protocol + '://' + req.get('host') + req.originalUrl
                        }
                    }
                }
            })
        })
    }
    else {
        res.sendStatus(400)
    }
}

// Create new artist || POST
exports.new = function(req, res) {

    // Bad Request empty body
    if(Object.keys(req.body).length === 0) {
        res.sendStatus(400)
    }
    else {
        let artist = new Artist()

        artist.name = req.body.name,
        artist.description = req.body.description
        artist.age = req.body.age

        // artist._link = {
        //     self: { href: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + artist._id },
        // }
        
        // Save the artist
        artist.save(function(error) {
            if(error) {
                res.json({
                    status: "error",
                    message: error
                })
            }
            res.json({
                message: 'New Artist created!',
                data: artist
            })
        })
    }
}

// View artist detail || GET
exports.view = function(req, res) {
    Artist.findById(req.params.artist_id, function(error, artist) {
        if(error) {
            res.json({
                status: "error",
                message: error
            })
        }
        res.json({
            message: "Fetching artist details...",
            data: artist
        })
    })
}

// Update artist || PATCH
exports.update = function(req, res) {
    Artist.findById(req.params.artist_id, function(error, artist) {
        if(error) {
            res.json({
                status: "error",
                message: error
            })
        }

        artist.name = req.body.name
        artist.description = req.body.description
        artist.age = req.body.age

        artist.save(function(error) {
            if(error) {
                res.json({
                    status: "error",
                    message: error
                })
            }
            res.json({
                message: "Artist info updated",
                data: artist
            })
        })
    })
}

// Delete artist || DELETE
exports.delete = function(req, res) {
    Artist.remove({
        _id: req.params.artist_id
    }, function(error) {
        if(error) {
            res.json({
                status: "error",
                message: error
            })
        }
        res.json({
            status: "success",
            message: "Artist Deleted"
        })
    })
}