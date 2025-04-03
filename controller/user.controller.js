const User = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signin = async (req, res) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === ""){
        return res.status(400).json({error: "Veuillez saisir un email et un mot de passe"})
    }

    let user = await User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    return res.status(201).json(user);
}

exports.login = async (req, res) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === ""){
        return res.status(400).json({error: "Veuillez saisir un email et un mot de passe"})
    }

    let user = await User.findOne({email: req.body.email});

    if (
        !user
        || !bcrypt.compareSync(req.body.password, user.password)
    ){
        return res.status(401).json({
            "error": "Email ou mot de passe incorrect"
        })
    }

    return res.status(200).json({
        id : user._id,
        email: user.email,
        token: jwt.sign({
            _id: user._id,
            email: user.email
        },process.env.JWT_KEY)
    })
}

exports.getAll = async(req, res) => {
    let users = await User.find();

    res.status(200).json(users);
}

exports.getById = async(req, res) => {
    let user = await User.findOne({_id: req.params.id});

    if (!user){
        return res.status(404).json({
            error: "Utilisateur non trouvé"
        })
    }

    res.status(200).json(user);
}

exports.modifyUser = async(req, res) => {
    if (!req.body.email && !req.body.password){
        return res.status(400).json({error: "Veuillez modifié au moins une information utilisateur"})
    }

    let user = await User.findOne({_id: req.params.id});

    if (!user){
        return res.status(404).json({
            error: "Utilisateur non trouvé"
        })
    }

    let updatedUser = {
        email: user.email,
        password: user.password
    }

    if (req.body.email ){
        updatedUser.email = req.body.email
    }

    if (req.body.password){
        updatedUser.password = bcrypt.hashSync(req.body.password, 10)
    }

    Object.assign(user, updatedUser);

    await user.save();
    res.status(201).json({
        id: user.id,
        email: user.email
    })
}

exports.deleteUser = async(req, res) => {
    await User.findOneAndDelete({_id: req.params.id});
    res.status(200).json({
        "message": "deleted"
    });
}