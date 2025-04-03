const express = require("express");
const router = express.Router();



router.get("/", (req, res, next) => {
    res.status(200).json('ok');
    });

router.get("/:id", (req, res, next) => {
    console.log(req.params.id);
    res.status(200).json('ok');
    });

router.post("/", (req, res, next) => {
    console.log(req.body);
    res.status(201).json('created');
    });


module.exports = router;