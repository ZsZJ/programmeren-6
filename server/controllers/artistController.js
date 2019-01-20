// Import Artist Model
Artist = require('../models/artistModel')

// Import Pagination helpers
Pagination = require('../helpers/pagination')

// Allow header options on collections
exports.collectionOptions = function(req, res) {
    res.header('allow', ["POST, GET, OPTIONS"])
    res.header('Access-Control-Allow-Methods', ['OPTIONS','GET','POST'])
    res.sendStatus(200)
}

// Allow header options on details
exports.detailOptions = function(req, res) {
    res.header('allow', ["GET, OPTIONS, PUT, DELETE"])
    res.header('Access-Control-Allow-Methods', ['OPTIONS','GET', 'PUT', 'DELETE'])
    res.sendStatus(200)
}

// List all the artists || GET
exports.index = async function(req, res) 
{
    res.header('Access-Control-Allow-Methods', ['GET'])

    if(req.accepts('json')) {

        const totalItems = await Artist.countDocuments()
        const start = ( (req.query.start === undefined || parseInt(req.query.start) === 0) ? 0 : parseInt(req.query.start))
        const limit = ( (req.query.limit === undefined || parseInt(req.query.limit) === 0) ? 0 : parseInt(req.query.limit))

        const currentPage = parseInt(Pagination.currentPage(totalItems, start, limit)) || 1
        const totalPages = parseInt(Pagination.numberOfPages(totalItems, limit)) || 1

        Artist.find()
        .skip(start)
        .limit(limit)
        .exec(function(error, artists) {
            if(error) {
                res.status(400).send({message: error})
            }
            else {  
                // Response JSON
                res.json({
                    items: artists,
                    _links: {
                        self: { href: req.protocol + '://' + req.get('host') + req.originalUrl }
                    },
                    pagination: {
                        currentPage: currentPage,
                        currentItems: artists.length,
                        totalPages: totalPages,
                        totalItems: totalItems,
                        _links: {
                            first: {
                                page: 1,
                                href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + Pagination.getFirstQueryString(1, limit)
                            },
                            last: {
                                page: totalPages,
                                href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + Pagination.getLastQueryString(totalItems, limit)
                            },
                            previous: {
                                page: (currentPage - 1 === 0 ? currentPage : currentPage - 1),
                                href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + Pagination.getPreviousQueryString(totalItems, start, limit)
                            },
                            next: {
                                page: (currentPage + 1 >= totalPages ? currentPage : currentPage + 1),                                  
                                href: req.protocol + '://' + req.get('host') + req.baseUrl + req.path + Pagination.getNextQueryString(totalItems, start, limit)
                            }
                        }
                    }
                })
            }
        })
    }
    else {
        res.sendStatus(400)
    }
}

// Create new artist || POST
exports.new = function(req, res) {

    res.header('Access-Control-Allow-Methods', ['POST'])

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

    res.header('Access-Control-Allow-Methods', ['GET'])

    Artist.findById(req.params.artist_id, function(error, artist) {
        if(artist !== null) {
            if(error) {
                res.status(400).send({message: error})
            }
            // Send response
            res.status(200).send(artist)
        }
        else {
            // Not found
            res.status(404).send({message: "Artist not found!"})
        }
    })
}

// Update artist || PUT
exports.update = function(req, res) {

    res.header('Access-Control-Allow-Methods', ['PUT'])

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

    res.header('Access-Control-Allow-Methods', ['DELETE'])

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