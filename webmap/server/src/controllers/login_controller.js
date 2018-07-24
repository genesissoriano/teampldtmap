const account = require('../../models/accounts');

exports.save = (req, res) => {
    const userLogin = new account({
        username: req.body.username,
        password: req.body.password
    });
    userLogin.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        rs.status(500).send({
            message: err.message
        })
    })
}