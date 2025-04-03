const jwt = require("jsonwebtoken");
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.Authorization.split(' ')[1];
    if (token) {
        let data = jwt.verify(token, process.env.JWT_KEY);
        if (data) {
            next();
        } else {
            res.status(401).json('Unauthorized');
        }
    } else {
        res.status(401).json('Unauthorized');
    }
}

module.exports = auth;