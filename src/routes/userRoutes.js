const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController")

const { checkAuth } = require("../middlewares/auth");

//rotas de users
router.get("/users/all", checkAuth, userController.getAll);
router.post("/users/create", userController.createUser);
router.post("/users/login", authController.login);
router.delete("/users/delete/:id", checkAuth, userController.deleteUser);

module.exports = router;