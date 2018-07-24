const Marker = require('../../models/marker');
 
// Retrieve and return all markers from the database.
exports.findAll = (req, res) => {
    Marker.find().sort({_id:1})
    .then(markers => {
        res.send({
            markers: markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};


// Retrieve and return markers given an LCP
exports.findLcp = (req, res) => {
    var re = new RegExp("^" + req.params.lpname + "NP");
    Marker.find({
        name: re
    }).sort({_id:1})
    .then(markers => {
        res.send({
            markers: markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};

// Retrieve and return a marker given a name
exports.findOne = (req, res) => {
    Marker.find({
        name: req.params.name
    }).sort({_id:1})
    .then(markers => {
        res.send({
            markers: markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};

// Retrieve and return markers given a Type
exports.findAllNaps = (req, res) => {
    Marker.find({
        type: "nap"
    }).sort({_id:1})
    .then(markers => {
        res.send({
            markers:markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};

// Retrieve and return markers given a Type
exports.findAllLcps = (req, res) => {
    Marker.find({
        type: "lcp"
    }).sort({_id:1})
    .then(markers => {
        res.send({
            markers:markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};

// Retrieve and return markers given a Type
exports.findAllReserved = (req, res) => {
    Marker.find({
        type: "reserved"
    }).sort({_id:1})
    .then(markers => {
        res.send({
            markers:markers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving markers."
        });
    });
};

// Save FormData - User to MongoDB
exports.save = (req, res) => {
	
    // Create a MArker
    const marker = new Marker({
        name: req.body.name,
        addr: req.body.addr,
        position: {
            lat: req.body.lat,
            lng: req.body.lng
        },
        type: req.body.type
    });
 
    // Save a Customer in the MongoDB
    marker.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Marker.findByIdAndUpdate(req.params.mID, {
        name: req.body.name,
        addr: req.body.addr,
        position: {
            lat: req.body.lat,
            lng: req.body.lng
        },
        type: req.body.type
    })
    .then(marker => {
        if(!marker) {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.mID
            });
        }
        res.send(marker);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.mID
            });                
        }
        return res.status(500).send({
            message: "Error updating marker with id " + req.params.mID
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Marker.findByIdAndRemove(req.params.mID)
    .then(marker => {
        if(!marker) {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.mID
            });
        }
        res.send({message: "Marker deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Marker not found with id " + req.params.mID
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.mID
        });
    });
};