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

            // Response JSON
            res.json({
                items: artists,
                _links: {
                    self: { href: req.protocol + '://' + req.get('host') + req.originalUrl }
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
    if(!req.body.name || !req.body.description || !req.body.age) {
        res.sendStatus(400)
    }
    else {
        let artist = new Artist(req.body)

        artist._links.self.href = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + artist._id
        artist._links.collection.href = req.protocol + '://' + req.get('host') + req.originalUrl

        // Save the artist
        artist.save(function(error) {
            if(error) {
                res.json({
                    status: "error",
                    message: error
                })
            }   
            res.status(201).send(artist)
        })
    }
}

// View artist detail || GET
exports.view = function(req, res) {
    Artist.findById(req.params.artist_id, function(error, artist) {
        if(artist !== null) {
            if(error) {
                res.status(400).send({message: error})
            }
            // Send response
            res.status(200).send(artist)
        }
        else {
            res.status(404).send({message: "Artist not found!"})
        }
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
        else {
            // Bad Request empty body
            if (!req.body.name || !req.body.description || !req.body.age) {
                res.sendStatus(400)
            }
            else {       
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
            }
        }
    })
}

// Delete artist || DELETE
exports.delete = function(req, res) {
    Artist.remove({
        _id: req.params.artist_id
    }, function(error, artist) {
        if(artist !== null) {
            if(error) {
                res.status(400).send({message: error})
            }
            res.status(204).send({message: "Artist Deleted"})
        }
        else {
            res.status(404).send({message: "Artist not found!"})
        }
    })
}