const subscriberMod = require('../../models/subscriber');

// Retrieve and return all subscribers from the database.
exports.findAll = (req, res) => {
    subscriberMod.find().sort({_id:1})
    .then(subscribers => {
        res.send({
            subscribers: subscribers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subscribers."
        });
    });
};

// Retrieve and return a marker given a name
exports.getSub = (req, res) => {
    subscriberMod.find({
        sip_no: req.params.sip_no
    }).sort({_id:1})
    .then(subscribers => {
        res.send({
            subscribers: subscribers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subcsribers."
        });
    });
};

// Save FormData - User to MongoDB
exports.save = (req, res) => {
	
    // Create a MArker
    const addsubscriber = new subscriberMod({
        sip_no: req.body.sip_no,
        name: req.body.name,
        addr: req.body.addr,
        package: req.body.package,
        d_installed: req.body.d_installed,
        lcpnap: req.body.lcpnap,
        port: req.body.port
    });
 
    // Save a Customer in the MongoDB
    addsubscriber.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.delete = (req, res) => {
    subscriberMod.findByIdAndRemove(req.params.sID)
    .then(subscriber => {
        if(!subscriber) {
            return res.status(404).send({
                message: "Subscriber not found with id " + req.params.sID
            });
        }
        res.send({message: "Subscriber deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Subscriber not found with id " + req.params.sID
            });                
        }
        return res.status(500).send({
            message: "Could not delete subscriber with id " + req.params.sID
        });
    });
};
exports.update = (req, res) => {
    subscriberMod.findByIdAndUpdate(req.params.eID, {
        sip_no: req.body.sip_no,
        name: req.body.name,
        addr: req.body.addr,
        package: req.body.package,
        d_installed: req.body.d_installed,
        lcp_nap: req.body.lcpnap,
        port: req.body.port
    })
    .then(edit_subscriber => {
        if(!edit_subscriber) {
            return res.status(404).send({
                message: "Subscriber not found with id " + req.params.eID
            });
        }
        res.send({message: "Subscriber edited successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Subscriber not found with id " + req.params.eID
            });                
        }
        return res.status(500).send({
            message: "Could not edit subscriber with id " + req.params.eID
        });
    });
};