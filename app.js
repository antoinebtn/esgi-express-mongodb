const express = require("express");
const productRoute = require("./route/product.route.js");
const authRoute = require("./route/auth.route.js");
const userRoute = require('./route/user.route')
const app = express();
const {connect} = require("./database/connexion.js");

app.use(express.json());

const database = async () => {
    await connect();
}

database();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/product', productRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);

module.exports = app;