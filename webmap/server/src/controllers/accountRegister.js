const userregister = require('../../models/accounts');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
	
    // Create a MArker
    const useraccounts = new userregister({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        password: req.body.password,
        type: req.body.type
    });
 
    // Save a Customer in the MongoDB
    useraccounts.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};