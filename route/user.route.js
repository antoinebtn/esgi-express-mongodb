const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller")

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.put("/:id", UserController.modifyUser);

router.delete("/:id", UserController.deleteUser);


module.exports = router;